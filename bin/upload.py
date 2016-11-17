#!/usr/bin/env python

import web
import os
import csv
import sqlite3
import datetime

urls = ('/upload', 'Upload')

tableSet = 0
tablePrint = ""

class Upload:
    # This loads a page that diplays the form
    def GET(self):
        global tableSet
        global tablePrint

        layout = """<html><head><style>
table, th, td {
    border: 1px solid black;
}
td {
    padding-right: 10px;
    padding-left: 10px;
    text-align:right;
}
body {
    background-color: #e5f4ff;
}
</style></head><body>
<h3>Please select a valid .csv file and click submit to view monthly expenses.</h3>
<form method="POST" enctype="multipart/form-data" action="">
<input type="file" name="myfile" />
<br/>
<input type="submit" />
</form>"""

        # Success after parsing, print table
        if tableSet == 1:
            layout = layout + tablePrint

            tableSet = 0
            tablePrint = ""

        # An error was encountered with the file upload
        elif tableSet == 2:
            layout = layout + """<h4>Not a valid file</h4>"""
            tableSet = 0

        layout = layout + """</body></html>"""

        return layout

    # Handle the file submission
    def POST(self):
        global tableSet

        x = web.input(myfile={})
        cwd = os.getcwd()

        if 'myfile' in x:
            filepath=x.myfile.filename.replace('\\','/')
            filename=filepath.split('/')[-1]
            filedir = cwd + '/' + filename
            try:
                fout = open(filedir,'w')
            except:
                tableSet = 2
                raise web.seeother('/upload')
                return

            fout.write(x.myfile.file.read())
            fout.close()

        parseFile(cwd +'/'+ filename)

        raise web.seeother('/upload')

# Parse the .csv file
def parseFile(uploadFile):
    global tableSet
    global tablePrint

    # Open database
    conn = sqlite3.connect('dataLab.db')
    cur = conn.cursor()
    with open(uploadFile, 'rb') as dataFile:
        dataReader = csv.DictReader(dataFile)
        cur.execute("DROP TABLE IF EXISTS imported")

        # Create a table based on the correct file format
        to_db = "CREATE TABLE imported (" + \
                "'date' text," + \
                "'category' text," + \
                "'employee name' text," + \
                "'employee address' text," + \
                "'expense description' text," + \
                "'pre-tax amount' real," + \
                "'tax name' text," + \
                "'tax amount' real)"

        cur.execute(to_db)
        conn.commit()

        # Parse the file and add rows to table
        for line in dataReader:
            try:
                d = datetime.datetime.strptime(line['date'], '%m/%d/%Y')
            except:
                conn.close()
                tableSet = 2
                return

            formattedDate = d.strftime('%Y-%m-%d')
            formattedPreTax = line['pre-tax amount'].replace(',', '')
            formatteTax = line['tax amount'].replace(',', '')
            to_db = "INSERT INTO imported VALUES ('" + \
                    formattedDate + "', '" + \
                    line['category'] + "', '" + \
                    line['employee name'] + "', '" + \
                    line['employee address'] + "', '" + \
                    line['expense description'] + "', '" + \
                    formattedPreTax + "', '" + \
                    line['tax name'] + "', '" + \
                    formatteTax + "')"
            cur.execute(to_db)

        conn.commit()
        cur.execute("DROP TABLE IF EXISTS sorted")

        # Create another table for the sorted data
        to_db = "CREATE TABLE sorted (" + \
                "'year' integer," + \
                "'month' integer," + \
                "'total expenses' real)"

        cur.execute(to_db)
        conn.commit()

        DATE_COL = 0
        PRETAX_COL = 5
        TAX_COL = 7
        prev_month = 0
        prev_year = 0
        total_expense = 0

        curSorted = conn.cursor()
        cur.execute("SELECT * FROM imported ORDER BY date(date)")

        # Insert records based on date and expenses
        for record in cur:
            year = int(record[DATE_COL][0:4])
            month = int(record[DATE_COL][5:7])

            if prev_month == 0:
                prev_month = month
                prev_year = year

            if month != prev_month or year != prev_year:
                curSorted.execute("INSERT INTO sorted VALUES (?, ?, ?)", \
                    (prev_year, prev_month, total_expense))
                prev_month = month
                prev_year = year
                total_expense = 0

            pretax = record[PRETAX_COL]
            tax = record[TAX_COL]
            total_expense = total_expense + pretax + tax

        curSorted.execute("INSERT INTO sorted VALUES (?, ?, ?)", \
            (year, month, total_expense))
        curSorted.execute("SELECT * FROM sorted")

        # Generate HTML format of new table
        tablePrint = """<table bgcolor="#FFFFFF">
<tr><td>Year</td><td>Month</td><td>Total expenses</td></tr>
"""

        for record in curSorted:
            my_date = datetime.datetime.strptime(str(record[1]), "%m")
            tablePrint = tablePrint + """<tr><td>""" + str(record[0]) + """</td>"""
            tablePrint = tablePrint + """<td>""" + my_date.strftime("%b") + """</td>"""
            tablePrint = tablePrint + """<td>""" + str(record[2]) + """</td></tr>
"""

        tablePrint = tablePrint + """</table>"""
        tableSet = 1
        conn.close()

if __name__ == "__main__":
   app = web.application(urls, globals()) 
   app.run()
