import os
import psycopg2
import urlparse

class DataWorker:
    rowcount = -1
    def __init__(self, filehandle, encoding="utf-8"):
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
        
        # For debugging: drop the table to clean up before creating it.
        cursor.execute("DROP TABLE IF EXISTS csvstore")

        sql = ''' CREATE TABLE IF NOT EXISTS csvstore
            (id SERIAL, entry_date date, category varchar,
            employee_name varchar, employee_address varchar,
            expense_description varchar, pretax_amount money, 
            tax_name varchar, tax_amount money) '''

        cursor.execute(sql)

        sql = ''' SET datestyle = 'ISO, MDY';
            COPY csvstore (entry_date,
            category, employee_name, employee_address, expense_description,
            pretax_amount, tax_name, tax_amount)
            FROM STDIN WITH CSV HEADER '''

        cursor.copy_expert(sql, filehandle)

        self.rowcount = cursor.rowcount
        print self.rowcount

        conn.commit()
        cursor.close()
        conn.close()

    def result(self):
        return "%d rows copied! (-1 means error)" % self.rowcount