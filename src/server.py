import os

from flask import Flask, send_from_directory, request
from flask.ext.cors import cross_origin
from flask.ext.uploads import UploadSet, configure_uploads
from flask.ext.api import status

import csv
import chardet
import unicodecsv
import psycopg2
import urlparse

from worker import DataWorker

# Static files are in the 'static' folder in project root.
STATIC_PATH = os.path.join(os.path.realpath("."), "static")

# Flask setup and config for upload filesets, using the
# static file serving directory.
app = Flask(__name__, static_url_path=STATIC_PATH)
app.config["UPLOADED_FILES_DEST"] = STATIC_PATH
app.config["UPLOADS_DEFAULT_DEST"] = STATIC_PATH

# Restrict allowed files to CSVs.
csvFileSet = UploadSet(name="csv", extensions=("csv"))
configure_uploads(app, csvFileSet)

# Endpoint for testing.
@app.route("/test")
@cross_origin(origins="*", headers=["X-Requested-With"])
def test():
	urlparse.uses_netloc.append("postgres")
	url = urlparse.urlparse(os.environ["DATABASE_URL"])

	conn = psycopg2.connect(
	    database=url.path[1:],
	    user=url.username,
	    password=url.password,
	    host=url.hostname,
	    port=url.port
	)

	cursor = conn.cursor()
	cursor.execute("SELECT * FROM csvstore")

	for row in cursor.fetchall():
		print row
		print "----------------"

	return "Test successful!", status.HTTP_200_OK


# Upload route handler.
@app.route("/upload", methods=["POST", "OPTIONS"])
@cross_origin(origins="*", headers=["X-Requested-With"])
def upload():
	# Handle cross origin preflight OPTIONS requests on upload: allow all origins.
	if request.method == "OPTIONS":
		return "Access-Control-Allow-Origin: *", status.HTTP_200_OK

	# Handle bad inputs
	if not (request and hasattr(request, "files")):
		return "Bad request object!", status.HTTP_500_INTERNAL_SERVER_ERROR

	if not (len(request.files) == 1):
		return "Please send exactly one file.", status.HTTP_500_INTERNAL_SERVER_ERROR

	# Save the uploaded file.
	filekey, filevalue = request.files.items()[0]
	csvFileSet.save(filevalue)
	upload_filename = csvFileSet.path(filevalue.filename)

	# Get the file's encoding.
	filehandle = open(upload_filename, "rU")
	encoding = chardet.detect(filehandle.read())["encoding"].lower()
	filehandle.seek(0)

	# Use the encoding to pick a CSV reader.
	reader = None

	if (encoding == "ascii"):
		reader = csv.reader(filehandle)
	else:
		reader = unicodecsv.reader(filehandle, encoding=encoding)

	# Insert the CSV data.
	worker = DataWorker(filehandle, encoding)

	# Delete the file and clean up the handle.
	os.unlink(filehandle.name)
	filehandle.close()

	return worker.result(), status.HTTP_200_OK

# Static file serving routes.
@app.route("/")
@app.route("/<path:filename>")
def static_paths(filename="index.html"):
	return send_from_directory(STATIC_PATH, filename)


# import unittest


# def run_tests():
# 	unittest.main()


if __name__ == "__main__":
	app.run()
	#run_tests()

