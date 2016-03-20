from django.shortcuts import render

from models import Expense

# Extra features (that would have been added with more time)
# TODO UI make each month expandable to view the details, or redirect to a new month
# TODO UI add a color scheme per category + add totals per category (for each month and the year
# TODO Add view that displays summary for all expenses contained in database

# the only view in this application. 
# -- returns upload.html on GET reuqests, a form with a file browser and drag and drop to select files to upload
# -- returns summary.html on POST requests, a page that displays a table containing the total expenses for each month
def upload(request):
    
    if request.method == 'GET':
         
        return render(request,'expense_reports/upload.html')
    
    elif request.method == 'POST':

        context = {'success': True }
        
        # get files uploaded by the user via form
        f = request.FILES.getlist('expense_report[]')
        
        try:
            # parse each file. Add entries to database then return a sorted list of tuples describing monthly expenses
            expenses,duplicates = parse_files(f)
            
            context['expenses'] = expenses     # an expense = (year,month,total_expense)
            context['duplicates'] = duplicates # indicates if the files contained duplicate entries
        
        except:
            # an error occured while parsing the file
            context['success'] = False
        
        return render(request,'expense_reports/summary.html',context)



# wrapper for the parse_file function
# executes parse_file for each file uploaded
# returns a list of tuples corresponding to monthly expense totals ordered by time
# and returns boolean duplicates indicating if the files uplaoded contained duplicate entries

def parse_files(files):

    breakdown = {}
    duplicates = False
    
    for f in files:
        dup = parse_file(f,breakdown)
        if dup == True:
            duplicates = True
    
    #print format_breakdown(breakdown)
    return format_breakdown(breakdown),duplicates



# parses each line of given file into the different variables (name, amount, description, date, etc)
# adds the total to in-memory variable beakdown that represents a X table storing all the monthly totals 
# saves entry to the databas
# returns duplicate boolean (set to True if elements could not be added to the database)

def parse_file(f,breakdown):
    
    # a year/month cross table that stores the totals
    # e.g. : {'2014': { 'January': 1300, 'February':500 }, '2013' : { }}

    for i,line in enumerate(f):
        if i != 0: ## skip header line

            date,category,name,address,description,pretax_amount,tax_name,tax_amount = parse_line(line)
            
            # reformat date into standard YYYY-MM-DD format 
            # this format enables querying the database for time periods and obtaining results sorted by time
            year,month,day = split_date(date)
            std_date = year + '-' + month + '-' + day
            
            # 1. save to memory
            full_amount = float(pretax_amount) + float(tax_amount)
            update_breakdown(breakdown,year,month,full_amount)
            
            #2. save to database
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
                duplicates = False
            except:  # IntegrityError as detail:
                duplicates = True      

    return duplicates



# parses each line into the different variables of interest 
#  returns all 8 variables

def parse_line(line):

    # TODO alternative way:  use three different regexes to parse lines depending on number of double quotes

    nb_double_quotes = line.count('"')
    
    seg = line.replace('"','')  # TODO add support for when strings are identified with single quotes
    
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



# function that updates breakdown variable (X-table of monthly totals)

def update_breakdown(breakdown,year,month,amount):

    if not year in breakdown: 
        breakdown[year] = {month:amount}  # adds first entry for given year

    elif not month in breakdown[year]:
        breakdown[year][month] = amount   # adds first entry for given month 

    else: 
        breakdown[year][month] += amount  # add to already existing entry



# returns a sorted list of (year,month,total_expenses) tuples
# generated from the breakdown X-table
# we retrive each monthly total in order, and as we do so, we also compute each year's total

def format_breakdown(breakdown):    
    breakdown_formated = []

    for year in sorted(breakdown.keys()):
        
        monthly_expenses = breakdown[year] # get dict month <--> total
        monthly_exp_sorted = []
        yearly_total = 0
        
        for month in sorted(monthly_expenses.keys()):   
            
            # replace with month name
            month_name = month_names[month]
            
            amount = monthly_expenses[month]
            monthly_exp_sorted.append((year,month_name,amount))
            
            # add to yearly total
            yearly_total += amount

        monthly_exp_sorted.insert(0,(year,'total',yearly_total))
        breakdown_formated.append(monthly_exp_sorted)

    return breakdown_formated



# takes a data in US format and return the year,month and day
# prepends a 0 if month or day is single digit

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
