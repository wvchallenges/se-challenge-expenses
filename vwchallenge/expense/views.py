# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from .models import Expense

from django.shortcuts import render
import io, csv, re
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
import datetime, uuid

import logging
log = logging.getLogger(__name__)

def index(request):
    return render(request,'index.html')

def convert_header(csvHeader):
    header_ = csvHeader[0]
    cols = [x.replace(' ', '_').lower() for x in header_.split(",")]
    
    #speicial case: pre-tax_amount should be convert to pre_tax_amount
    if 'pre-tax_amount' in cols:
        loc = cols.index('pre-tax_amount')
        cols[loc] = 'pre_tax_amount'

    if 'employee_address' in cols:
        cols.remove('employee_address')
    return cols

def monthly_cost(records):
    #make calculations on monthly cost
    data = {}
    month_index = records[0]['month']
    year_index = records[0]['year']
    time_stamp = str(year_index) + '-' + str(month_index)
    data[time_stamp] = 0.0
    for iterm in records:
        if iterm['year'] != year_index or iterm['month'] != month_index:
            year_index = iterm['year']
            month_index = iterm['month']
            time_stamp = str(year_index) + '-' + str(month_index)
            data[time_stamp] = 0.0
        time_stamp = str(year_index) + '-' + str(month_index) 
        data[time_stamp] += float(iterm['pre_tax_amount']) + float(iterm['tax_amount'])

    return data

def upload_csv(request):
    ret_data = {}
    ret_data['ret_err'] = 0
    ret_data['err_msg'] = ""
    ret_data['record'] = []
    if "GET" == request.method:
        return render(request, "index.html")
    # if not GET, then proceed
    try:
        csv_file = request.FILES["csv_file"]
        if not csv_file.name.endswith('.csv'):
            log.error(request,'File is not CSV type')
            ret_data['ret_err'] = 1
            ret_data['err_msg'] = "File is not CSV type"
            return render(request, 'index.html', {'cost': ret_data})
        #if file is too large, return
        if csv_file.multiple_chunks():
            log.error(request,"Uploaded file is too big (%.2f MB)." % (csv_file.size/(1000*1000),))
            ret_data['ret_err'] = 1
            ret_data['err_msg'] = "Uploaded file is too big (%.2f MB)." % (csv_file.size/(1000*1000),)
            return render(request, 'index.html', {'cost': ret_data} )

        file_tag = uuid.uuid4()
        file_data = csv_file.read().decode("utf-8")        
        io_string = io.StringIO(file_data)
        reader = csv.reader(io_string, delimiter=str(u';'), quotechar=str(u'|'))
        header_ = next(reader)
        header_cols = convert_header(header_)
        #print header_cols
        
        for line in reader:
            i = 0
            raw_data = line[0]
            data_dict = {}
            
            #handle address case: address is covered by qoute
            double_qoute_start = raw_data.find("\"")
            double_qoute_end = raw_data.find("\"", double_qoute_start+1)
            data_dict["employee_address"] = raw_data[double_qoute_start+1:double_qoute_end] 
            raw_data = raw_data[0:double_qoute_start-2] + raw_data[(double_qoute_end+1):] 
            
            #convert "1,500" to 1500 
            number = re.findall(r'"([^"]*)"', raw_data)
            if number:
                for num_str in number:
                    num_str_start_index = raw_data.find(num_str)
                    clean_num_str = num_str.replace(',', '')
                    raw_data = raw_data[0:num_str_start_index-1]+clean_num_str+raw_data[num_str_start_index+len(num_str)+1:]

            fields = raw_data.split(",")
            
            for field in fields:
                key = header_cols[i]
                data_dict[key] = field
                i += 1
            data_dict['date'] = datetime.datetime.strptime(data_dict['date'], '%m/%d/%Y').strftime('%Y-%m-%d')
            data_dict['file_tag'] = file_tag
            expense = Expense(**data_dict)

            try:
                expense.save()
            except Exception as e:
                ret_data['ret_err'] = 1
                ret_data['err_msg'] = "unable to save DB" +repr(e)
                log.error("unable to save DB: " +repr(e) )                    
                pass
            
        log.info("save file to DB: "+ str(file_tag))
    
    except Exception as e:
        log.error("Unable to upload file. "+repr(e))
        ret_data['ret_err'] = 1
        ret_data['err_msg'] = "Unable to upload file. "+repr(e)

    if not ret_data['ret_err']:
        qs = Expense.objects.filter(file_tag = file_tag).extra(select = {
        'month': "EXTRACT(month FROM date)",
        'year': "EXTRACT(year FROM date)",
        }).values('month', 'year', 'pre_tax_amount', 'tax_amount').order_by('date')
            
        if qs:
            data = monthly_cost(qs)
      
            #prepare data for templates
            time_stamps = list(data.keys())
            time_stamps = sorted(time_stamps, key=lambda x:datetime.datetime.strptime(x, '%Y-%m'))
            for iterm in time_stamps:
                record={}
                record['time'] = iterm
                record['value'] = data[iterm]
                ret_data['record'].append(record)
            ret_data['ret_err'] = 0
        else:
            ret_data['ret_err'] = 1  
            ret_data['err_msg'] = "could not find data record in DB"

    return render(request, "index.html", {'cost': ret_data})
 

