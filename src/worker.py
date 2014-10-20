import os
import psycopg2
import urlparse

class DataWorker:
    rowcount = -1
    resultMarkup = "<div>No results.</div>"

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
        # cursor.execute("DROP TABLE IF EXISTS csvstore")

        sql = ''' CREATE TABLE IF NOT EXISTS csvstore
            (entry_date date, category varchar,
            employee_name varchar, employee_address varchar,
            expense_description varchar, pretax_amount money, 
            tax_name varchar, tax_amount money) '''

        cursor.execute(sql)

        sql = ''' SET datestyle = 'ISO, MDY';
            COPY csvstore (entry_date,
                category,
                employee_name,
                employee_address,
                expense_description,
                pretax_amount,
                tax_name,
                tax_amount)
            FROM STDIN WITH CSV HEADER '''

        cursor.copy_expert(sql, filehandle)
        self.rowcount = cursor.rowcount

        sql = ''' SELECT date_trunc('month', entry_date) AS month,
                sum (pretax_amount) as pretax_subtotal,
                sum (tax_amount) as tax_subtotal,
                sum (pretax_amount - tax_amount) as posttax_subtotal
            FROM csvstore
            GROUP BY month ORDER BY month
        '''

        cursor.execute(sql)

        self.resultMarkup = '''<tr>
            <td>Month</td>
            <td>Pretax</td>
            <td>Tax</td>
            <td>After Tax</td>
        </tr>'''

        highlight = True

        for row in cursor.fetchall():
            date, pretax, tax, posttax = row
            self.resultMarkup += "<tr " + ("class='highlight'" if highlight else '') + '''>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
            </tr>
            ''' % (date.strftime("%B, %Y"), pretax, tax, posttax)
            highlight = not highlight

        self.resultMarkup = "<table>%s</table>" % self.resultMarkup

        conn.commit()
        cursor.close()
        conn.close()

    def result(self):
        return self.resultMarkup #  "%d rows copied! (-1 means error)" % self.rowcount