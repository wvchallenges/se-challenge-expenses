from wutils import Mysql,upload
from flask import Flask, jsonify,request, Response
from flask_cors import CORS
import csv, os, time, sys
from collections import OrderedDict
from dateutil.parser import parse as parseDate

app = Flask(__name__,template_folder='./', static_folder='./dist/', static_url_path='')
app.config['SECRET_KEY'] = 'a319fe0e3df384b2b5db3ab5cbe1630d221913ca'
app.config['DEFAULT_PARSERS'] = [
	'flask.ext.api.parsers.JSONParser',
	'flask.ext.api.parsers.URLEncodedParser',
	'flask.ext.api.parsers.FormParser',
	'flask.ext.api.parsers.MultiPartParser'
]
cors = CORS(app,resources={r"/*":{"origins":"*"}})
# if running .pyc, set debug to false
try:
	DEBUG = __file__[-3:]!='pyc'
except Exception, e:
	DEBUG = False

m = Mysql()

replaceData = False

mysqlInfo = {
	"dbuser":''
	,"dbpass":''
	,"dbport":''
	,"dbhost":'localhost'
	,"dbname":'wave_test'
}

def uploadHandler(req):
	global replaceData
	try:
		# make sure file is specified
		if (not (hasattr(req,'files') and req.files and 'wfile' in req.files)):
			return {"result":False,"msg":"no file specified"}
		# try to upload it
		uppPath = upload(req.files['wfile'])
		if (not uppPath):
			return {"result":False,"msg":"could not upload file"}
		columnNames = ['date','category','employee_name','employee_address','expense_description','pre_tax_amount','tax_name','tax_amount']
		valueRows = []
		# file uploaded, now parse it
		with open(uppPath, 'rb') as csvfile:
			rrows = csv.reader(csvfile)
			header = False
			for row in rrows:
				if (not header):
					header = row[:]
					continue
				if(len(row)!=len(columnNames)):
					return {"result":False,"msg":"You lie! The data is not all there!"}
				row[0] = parseDate(row[0]) #convert date from str to date object
				row[5] = float(row[5].replace(',','')) #convert floats 
				row[7] = float(row[7].replace(',',''))
				valueRows.append(tuple(row[:]))
		if (not valueRows):
			return {"result":False,"msg":"Something went wrong, try again!"}
		if (replaceData):
			m.run("TRUNCATE TABLE `w_ai_expenses`")
		sql = "INSERT INTO `w_ai_expenses` (" + ','.join(columnNames) + ") VALUES (" + ','.join(['%s']*len(columnNames)) + ")"
		result = m.run(sql,tuple(valueRows),multiple = True)
		# file parsed - remove it
		os.remove(uppPath)
		return {"result":True,"msg":"Success"}
	except Exception, e:
		print "[[uploadHandler]]:",e,sys.exc_traceback.tb_lineno
		return {"result":False,"msg":"An error occurred, please try again"}
def credHandler(req):
	global m, mysqlInfo
	data = req.json
	print data
	try:
		m.connect(dbuser=data['dbuser'],dbpass=data['dbpass'],dbname=data['dbname'],dbport=data['dbport'],dbhost=data['dbhost'])
		if(not m.isConnected):
			print "not connected!",m.isConnected,m.lastErr
			return {"result":m.isConnected,"msg":m.lastErr}
		# check if the table exists
		result = m.run("SHOW TABLES LIKE 'w_ai_expenses'").assoc
		print "show table:",result,m.lastErr
		if (not result):
			# doesn't exist - create it
			result = m.run("CREATE TABLE IF NOT EXISTS `w_ai_expenses` (\
								`id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,\
								`date` date NOT NULL,\
								`category` varchar(128) COLLATE utf8_unicode_ci NOT NULL,\
								`employee_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,\
								`employee_address` varchar(256) COLLATE utf8_unicode_ci NOT NULL,\
								`expense_description` varchar(128) COLLATE utf8_unicode_ci NOT NULL,\
								`pre_tax_amount` decimal(7,2) NOT NULL,\
								`tax_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,\
								`tax_amount` decimal(7,2) NOT NULL\
							) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;").assoc
			if (m.lastErr):
				m.close()
				return {"result":False,"msg":m.lastErr}
		mysqlInfo = data
		return {"result":m.isConnected}
	except Exception, e:
		print "[[credHandler]]:",e
		return {"result":False,"msg":str(e)}
def setReplaceHandler(req):
	global replaceData
	try:
		replaceData = req.json['replace']
	except Exception, e:
		pass
	return {"result":True}
def getData():
	data = m.run("SELECT YEAR(`date`) AS `year`, \
						MONTH(`date`) AS `month`, \
						SUM(tax_amount+pre_tax_amount) AS `total` \
				FROM `w_ai_expenses` \
				GROUP BY Month(`date`)").assoc
	return data

@app.route("/")
def indexroute():
    return app.send_static_file('index.html')

@app.route("/<path:path>", methods=["POST","PUT","DELETE"])
def mainroute(path=""):
	global mysqlInfo
	print "attempting:",path,request.method
	if (path == 'upload'):
		return jsonify(uploadHandler(request))
	if (path == 'credentials'):
		return jsonify(credHandler(request))
	if (path == 'isConnected'):
		return jsonify({"result":mysqlInfo['dbuser']})
	if (path == 'setReplaceData'):
		return jsonify(setReplaceHandler(request))
	if (path == 'getData'):
		return jsonify(getData())
	return jsonify({"msg":"Invalid action"})

if __name__ == '__main__':
	app.run(port=5891,host='0.0.0.0')
