from django.shortcuts import render

from models import Expense

# TODO : extra feature: add multiple files?


def upload(request):
    
    if request.method == 'GET':

        return render(request,'expense_reports/upload.html') # TODO use context to add an error message
    
    elif request.method == 'POST':
       
        context = {'success': True }
        f = request.FILES['fileselect']
        parse_file(f)

        return render(request,'expense_reports/summary.html',context)
        

def parse_file(expenses):
    # TODO there may be a more ellegant/efficient way of skipping the first line)
    # alternate, readline, then while has next == true, read line
    
    for i,line in enumerate(expenses):
        if i != 0: ## skip header line
            
            monthly_expenses = {}   
            
            # TODO count number of double quotes in line, and use two different regexes to parse

            seg = line.split('\"') # TODO add support for when strings are identified with single quot0es

            # first segment: date,category,name,_
            date,category,name,_ = seg[0].split(',')
           
            # second segment: address
            address = seg[1]

            if len(seg) == 3:

                # third segment: _ ,description, pretax_amount, tax_name, tax_amount
                _,description,pretax_amount,tax_name,tax_amount = seg[2].split(',')
                
            else:

                # third segment: _, description,_
                _,description,_ = seg[2].split(',')
                
                # fourth segment: pretax_amount: e.g. 15,000
                pre,post = seg[3].split(',')
                pretax_amount = pre + post
                
                # fifth segment: _,tax_name,tax_amount 
                _,tax_name,tax_amount = seg[4].split(',')

            
            # reformat date into standard YYYY-MM-DD format 
            # this format makes the database query-able for dates 
            year,month,day = split_date(date)
            std_date = year + '-' + month + '-' + day

            
            # TODO prevent double entries

            expense=Expense(
                    date_db = std_date, 
                    date = date,
                    category = category,
                    name = name,
                    address = address,
                    description = description,
                    pretax_amount = pretax_amount,
                    tax_name = tax_name,
                    tax_amount = tax_amount
                    )
            expense.save()


        # TODO import.html, drag/drop or select file button 

        # TODO add progress bar


# Extra feature
# make each month expandable to view the details, or redirect to a new month
# to do: add a color scheme per category + add totals per category (for each month and the year

def split_date(US_date):
            
    date = US_date.split('/')
    month = date[0]
    day = date[1]
    year = date[2]

    # append a 0 when necessary
    # (pre-formatting for YYYY-MM-DD format)
    if len(day) == 1 :
        day = '0' + day
    
    if len(month) == 1 :
        month = '0' + month

    return year,month,day   
