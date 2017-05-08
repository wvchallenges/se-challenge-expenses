import sqlite3
import csv
import tkMessageBox

try:
    # for Python2
    from Tkinter import *   
    
except ImportError:
    # for Python3
    from tkinter import *
    




def db_initializer():
    # Sets up the initial database and table if one doesnt exist
    connection = sqlite3.connect('Wave.db')
    print ("Opened database successfully")
    connection.execute("drop table if exists COMPENSATION")
    connection.commit()
    connection.execute('''CREATE TABLE COMPENSATION
           (ID INT PRIMARY KEY     NOT NULL,
           TRANSDATE           DATE    NOT NULL,
           CATEGORY            TEXT     NOT NULL,
           EMPLOYEE_NAME        TEXT    NOT NULL,
           EMPLOYEE_ADDRESS        TEXT   NOT NULL,
           EXPENSE_DESC        TEXT   NOT NULL,
           PRE_TAX        REAL   NOT NULL,
           TAX_NAME        TEXT      NOT NULL,
           TAX_AMOUNT         REAL   NOT NULL);''')    
    connection.close()



def date_formatter(date):
    # Formatting the date for the SQLite
    elements = date.split('/')
    month =''
    day = ''
    if len(elements[0]) == 1:
        month += '0'
    month += elements[0]
    if len(elements[1]) == 1:
        day += '0'
    day +=  elements[1]
        
    datefmt = elements[2]+'-'+month + '-' + day
    #print (datefmt)
    return datefmt
    


def currency_handler(strng):
    # Formatting the currency without ','
    fmt_currency = ''
    units = strng.split(',')
    for unit in units:
        fmt_currency += unit.lstrip();
    return fmt_currency



def next_window():
    # Pull data from the the table and display result in the new window
    root = Tk()
    root.wm_title("Total Expenses By Month")
    connection = sqlite3.connect('Wave.db')
    cursor = connection.execute("SELECT strftime(\"%m-%Y\", TRANSDATE) as 'Months', SUM(PRE_TAX) , SUM(TAX_AMOUNT) FROM COMPENSATION GROUP BY strftime(\"%m-%Y\", TRANSDATE)")
    cellrow=1
    #Headings for the table
    MonthHeading = Label(root, text="Month")
    MonthHeading.grid(row=0, column=0)
    TotalExpense = Label(root, text="Total Expense")
    TotalExpense.grid(row=0, column=2)
    
    for row in cursor:
        month_entry = Label(root, text = row[0])
        month_entry.grid(row=cellrow, column=0)
        total = float(row[1]) + float(row[2])
        total_entry = Label (root, text = str(total))
        total_entry.grid(row = cellrow, column = 2)
        cellrow += 1
    connection.close()
       

       


def fileupload (Event):
    # Checks for the filename and type. Parses the CSV file and then inserts the data into the table
    name = fname.get().split('.')
    if fname.get() == "":
        #Incorrect filename
        tkMessageBox.showinfo("Filename Error", "Please enter a valid filename.")
       
    elif name[1] != "csv":
        #Incorrect file type
        tkMessageBox.showinfo("File Type Error", "Incorrect File Type.")
        
    else:
        #Set up the database and table
        db_initializer()
        connection = sqlite3.connect('Wave.db',detect_types=sqlite3.PARSE_DECLTYPES)
        counter = 0;
        #id is the primary key 
        id = 1
        with open(fname.get(), 'rb') as f:
            reader = csv.reader(f)
            for row in reader:
                
                if counter != 0:
                    lgth_row = len(row) - 1 
                    date = date_formatter(row[0])
                    pretax = currency_handler(row[5])
                    taxamt = currency_handler(row[7])
                    connection.execute("INSERT INTO COMPENSATION (ID,TRANSDATE,CATEGORY,EMPLOYEE_NAME,EMPLOYEE_ADDRESS,EXPENSE_DESC,PRE_TAX,TAX_NAME,TAX_AMOUNT) \
                      VALUES ("+ str(id) +",'"+ date +"' ,'"+ row[1] +"', '"+ row[2] +"', '"+ row[3] +"', '"+ row[4]+"', "+ pretax +", '" + row[6]+"', "+ taxamt +")")
                    
                    
                    connection.commit()
            
                   # print ("INSERT INTO COMPENSATION (ID,TRANSDATE,CATEGORY,EMPLOYEE_NAME,EMPLOYEE_ADDRESS,EXPENSE_DESC,PRE_TAX,TAX_NAME,TAX_AMOUNT) \
                    #  VALUES ("+ str(id) +",'"+ date +"' ,'"+ row[1] +"', '"+ row[2] +"', '"+ row[3] +"', '"+ row[4]+"', "+ str(row[5]) +", '" + row[6]+"', "+ row[7] +")")
                    id = id + 1
                    
                    
                counter = counter + 1
                    
        connection.close()
        # Opens the new window to display the total expenses
        next_window()

if __name__ == "__main__":
    
    root = Tk()
    db_initializer()
    root.wm_title("Wave Challenge")
    Label(root,text= "Filename:").pack(side=LEFT)
    fname = Entry(root)
    fname.pack(side=LEFT)
    btn = Button(root,text="Submit")
    btn.bind("<Button-1>", fileupload)
    btn.pack(side=LEFT)
    root.mainloop()
