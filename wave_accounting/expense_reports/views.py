from django.shortcuts import render

from models import Expense

# Extra features
# TODO add multiple files?
# TODO UI make each month expandable to view the details, or redirect to a new month
# TODO UI add a color scheme per category + add totals per category (for each month and the year


def upload(request):
    
    if request.method == 'GET':
         
        return render(request,'expense_reports/upload.html') # TODO use context to add an error message
    
    elif request.method == 'POST':

        context = {'success': True }
        
        f = request.FILES.getlist('expense_report[]')
        
        try:
            # parse each file. Add entries to database then return a sorted list of tuples describing monthly expenses
            expenses,duplicates = parse_files(f)
            context['expenses'] = expenses
            context['duplicates'] = duplicates # indicates if the files contained duplicate entries
        
        except: 
            context['success'] = False
        
        return render(request,'expense_reports/summary.html',context)
       
def parse_files(files):

    breakdown = {}
    duplicates = False
    
    for f in files:
        dup = parse_file(f,breakdown)
        if dup == True:
            duplicates = True
    
    #print format_breakdown(breakdown)
    return format_breakdown(breakdown),duplicates

def parse_file(f,breakdown):
    
    # a year/month cross table that stores the totals
    # e.g. : {'2014': { 'January': 1300, 'February':500 }, '2013' : { }}

    for i,line in enumerate(f):
        if i != 0: ## skip header line

            date,category,name,address,description,pretax_amount,tax_name,tax_amount = parse_line(line)
            
            # reformat date into standard YYYY-MM-DD format 
            # this format makes the database query-able for dates 
            year,month,day = split_date(date)
            std_date = year + '-' + month + '-' + day
            
            # 1. save to memory
            full_amount = float(pretax_amount) + float(tax_amount)
            update_breakdown(breakdown,year,month,full_amount)
            
            #2. save to database
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
            try:
                expense.save()
            except:  # IntegrityError as detail:
                duplicates = True      

    return duplicates




def update_breakdown(breakdown,year,month,amount):

    if not year in breakdown: 
        breakdown[year] = {month:amount}  # adds first entry for given year

    elif not month in breakdown[year]:
        breakdown[year][month] = amount   # adds first entry for given month 

    else: 
        breakdown[year][month] += amount  # add to already existing entry



def format_breakdown(breakdown):    
    breakdown_formated = []

    for year in sorted(breakdown.keys()):
        
        d = breakdown[year]
        tmp = []
        total = 0
        
        for month in sorted(d.keys()):   
            
            # replace with month name
            month_name = month_names[month]
            
            amount = d[month]
            total += amount
            tmp.append((year,month_name,amount))

        tmp.insert(0,(year,'total',total))
        breakdown_formated.append(tmp)

    return breakdown_formated



def parse_line(line):

    # TODO use three different regexes depending on number of double quotes

    nb_double_quotes = line.count('"')
    
    seg = line.replace('"','')  # TODO add support for when strings are identified with single quot0es
    
    seg = seg.split(',')

    date = seg[0]
    category = seg[1] 
    name = seg[2]
   
    address = seg[3] + "," + seg[4] + "," + seg[5]

    description = seg[6]

    # we always have 2 double quotes for the address. 
    # if we had 4, it's because the pretax_amount contains a comma 
    if nb_double_quotes >= 4: 
        pretax_amount = seg[7] + seg[8]
        tax_name = seg[9]

        if nb_double_quotes == 4:
            tax_amount = seg[10]
        else:
            # for the unlikely case of a ~10k expense with a tax >= $ 1,000
            tax_amount = seg[10] + seg[11]

    else:
        pretax_amount = seg[7]
        tax_name = seg[8]
        tax_amount = seg[9]

    return date,category,name,address,description,pretax_amount,tax_name,tax_amount


def split_date(US_date):
            
    date = US_date.split('/')
    month = date[0]
    day = date[1]
    year = date[2]

    # append a 0 when necessary
    # (pre-formatting for YYYY-MM-DD format)
    day = day.zfill(2)  # side note: there really is a Python function for everything
    month = month.zfill(2)

    return year,month,day  

# convert months number to literal equivalent for UI
month_names = {
                '01':'January',
                '02':'February',
                '03':'March',
                '04':'April',
                '05':'May',
                '06':'June',
                '07':'July',
                '08':'August',
                '09':'September',
                '10':'October',
                '11':'November',
                '12':'December'
                }
