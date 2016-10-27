import MySQLdb, sys, os
from MySQLdb import converters
from werkzeug import secure_filename
class Mysql(object):
	#constructor
	def __init__(self):
		super(Mysql, self).__init__()

		self._myconv=converters.conversions.copy()
		self._myconv[246]=float    # convert decimals to floats
		# self._myconv[10]=str     # convert dates to strings

		self.MySQLdb = MySQLdb
		self.cursor = None
		self._array = []
		self._assoc = []
		self._length = 0
		self._lastErr = ''
		self._lastSQL = ''
		self._db=None
		self._isconnected = False
	#properties
	@property
	def array(self): #read-only property
		"""(list) List (of lists) containing rows returned from the last query
		"""
		return self._array
	@property
	def isConnected(self):
	    return self._isconnected
	@property
	def assoc(self): #read-only property
		"""(list) List of dictionaries containing key-value pairs from the last query.
			e.g. SELECT fname,gender FROM person could result in: 
				[
					{'fname':'john','gender':'m'},
					{'fname':'jane','gender':'f'}
				]
		"""
		return self._assoc
	@property
	def lastErr(self):
	    return self._lastErr
	@property
	def length(self): #read-only property
		"""(int) Number of rows returned in the last query (either rows selected in SELECT or affected by UPDATE or DELETE)
		"""
		return self._length
	@property
	def lastID(self):
		""" (int|str) ID from the last insert operation
		"""
		return self._lastID
	@property
	def dbhost(self):
	    return self._dbhost
	@property
	def dbname(self):
	    return self._dbname
	@property
	def dbpass(self):
	    return self._dbpass
	@property
	def dbport(self):
	    return self._dbport
	@property
	def dbuser(self):
	    return self._dbuser
	#methods
	def connect(self,dbuser,dbpass,dbname,dbhost='localhost',dbport=3306):
		"""Connects to the MySQL database
		
		Args:
		    dbuser (str): username
		    dbpass (str): password
		    dbname (str): database name
		    dbhost (str, optional): hostname of the MySQL server
		    dbport (int, optional): MySQL server port
		
		Returns:
			Mysql: mysql class object
		"""
		try:
			self._dbhost = dbhost
			self._dbuser = dbuser
			self._dbpass = dbpass
			self._dbname = dbname
			self._dbport = dbport
			self.reconnect()
		except Exception, e:
			print e, sys.exc_traceback.tb_lineno
		return self

	def close(self):
		try:
			if(self.cursor):
				self.cursor.close()
		except Exception, e:
			print "[mysql]:",e,sys.exc_traceback.tb_lineno
		try:
			if(self._db):
				self._db.close()
		except Exception, e:
			print "[mysql]:",e,sys.exc_traceback.tb_lineno
		self._isconnected = False
	def reconnect(self):
		"""Reestablish a lost MySQL connection (using saved credentials)
		
		Returns:
		    None
		"""
		try:
			self.close() #in case the connection was open before
		except Exception, e:
			pass
		try:
			self._db = self.MySQLdb.Connection(host=self._dbhost,user=self._dbuser,passwd=self._dbpass,port=self._dbport,conv=self._myconv)
			self.cursor = self._db.cursor()
			result = self.run("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = %s",(self._dbname,)).assoc
			if (not result):
				self.run("CREATE DATABASE IF NOT EXISTS `"+self._dbname+"`")
			self.cursor.execute("USE `"+self._dbname+"`")
		except Exception, e:
			print "[mysql]:",e,sys.exc_traceback.tb_lineno
			self._lastErr = str(e)
		try:
			self._isconnected = bool(self._db.open)
		except Exception, e:
			self._isconnected = False
	def run(self,sql,data=False,autocommit=True,retryOnDisconnect=True,multiple=False):
		"""Run a specified SQL query on the database
		
		Args:
			sql (string): The query to run. Can include parameters from 'data' variable. e.g. "SELECT * FORM users WHERE id=%d"
			data (tuple, optional): Data for the query. e.g. in the above example data could be (15,). Default: False
			autocommit (bool, optional): Whether to commit the operation right away. Default: True
			retryOnDisconnect (bool,optional): Whether to retry running the query if the server loses connection. Default:True
			multiple (bool,optional): Whether this query requires executemany() command (e.g. inserting multiple values)
		
		Returns:
			Mysql: the mysql object instance
		"""
		try:
			self._array = []
			self._assoc = []
			self._length = 0
			self._lastID = None
			self._lastErr = ''
			if(not self._db.open):#conection closed (automatically or manually)
				self.reconnect()
			if(data):
				if(multiple):
					self.cursor.executemany(sql,data)
				else:
					self.cursor.execute(sql,data)
			else:
				self.cursor.execute(sql)

			# get the number of affected rows
			self._length = self.cursor.rowcount
			# last id (either last inserted row ID or just last ID from the query)
			self._lastID = self.cursor.lastrowid

			if(sql[0:6].lower()=='select'):
				# for select queries, fetch the data
				# get the data
				self._array = list(self.cursor.fetchall())

				# generate the associative array from data
				field_names = [i[0] for i in self.cursor.description] #get the field names
				
				# go through each row, and create a dictioanry {'fieldName1':'value','fieldName2':....}
				# out of it from names (as keys) and row items (as values). then save all the rows as list
					# equivalent code written out:
					# result = []
					# i=0
					# for row in self.array():
					# 	j=0
					# 	result[i]={}
					# 	for field in field_names:
					# 		result[i][field]=row[j]
					# 		j+=1
					# 	i+=1
				self._assoc = [dict(zip(field_names,row)) for row in self.array]
			#end if select
			if(autocommit):
				self.commit()

		except Exception, e:
			print "[mysql]",e,sys.exc_traceback.tb_lineno, "sql (template):",sql,"\n////////////////////////////////"
			self._lastErr = str(e)+' '+str(sys.exc_traceback.tb_lineno)
			try:
				if('server has gone away' in self.lastErr):
					self.reconnect()
					if(retryOnDisconnect):#retry running a query since the server disconnected
						self.run(sql,data,autocommit,False) #do not retry again if the same error happens
				print("---------------------------")
				print(self.cursor._last_executed)
				print("---------------------------")
			except Exception, e:
				print "fail to print??????",e
			try:
				self.rollback()
			except:
				pass
		try:
			self._lastSQL = self.cursor._last_executed
		except Exception, e:
			pass
		return self
	def exists(self,table,data,keys=['id']):
		"""Check if a value exists in the 'table'
		
		Args:
		    table (str): Name of the table to check. NB: make sure table name is NEVER user-submitted!!!!
		    data (dict): {field:value} pair to check. NB: make sure field name is NEVER user-submitted!!!!
		    keys (list, optional): names of key fields to return if a match is found. Default: ['id']. NB: make sure keys are NEVER user-submitted!!!!
		
		Returns:
		    list: list of 'keys' from the entry matching the value (or an empty list if none found)
		"""
		field = data.keys()[0]
		value = data[field]
		comparison = 'like' if isinstance(value,basestring) else '='
		chk = self.run('SELECT `'+'`, `'.join(keys)+'` FROM '+table+' WHERE `'+field+'` '+comparison+' %s',(value,)).array
		if(chk):
			chk = chk[0]
		return list(chk)
	def commit(self):
		"""Commits executed transactions
		
		Returns:
			none
		"""
		try:
			self._db.commit()
			return True
		except Exception, e:
			return False
	def rollback(self,resetKey=False):
		"""Rolls back executed transactions
		
		Args:
			resetKey (bool, optional): Whether to reset the auto-increment field on this table after rollback

		Returns:
			bool: Whether the rollback was successful
		
		"""
		try:
			self._db.rollback()
			if(resetKey):
				self.run('ALTER TABLE `'+table+'` AUTO_INCREMENT = 1',autocommit=True)
			return True
		except Exception, e:
			return False
#end Mysql class

def upload(file):
	"""Flask file upload function. Saves a given file to the temporary location (or permanent one, if specified) 
		and returns the uploaded file path. Optionally can overwrite or append unique suffix if the file already exists.
	
	Args:
		file (Flask File Object): Flask object from reuquest. e.g. request.files['file']
	
	Returns:
		str: Path to the uploaded file. False if something goes wrong
	"""
	try:
		if(not file):
			return False
		UPLOAD_BASE = './'
		name = secure_filename(file.filename)
		#absolute path of the file to save - saves to a temporary folder (if force-converting) or final destination folder (if not force-converting)
		savePath = os.path.join(UPLOAD_BASE,name)
		# save the uploaded file in the new location
		file.save(savePath)
		# check if user wants to force it into a particular format
		return savePath
	except Exception, e:
		print "[[upload]]:",e,sys.exc_traceback.tb_lineno
		return False
#end upload
