require 'csv'

class ImportController < ApplicationController
  def form
  end

  # assume file exists and is well formed csv file according to spec in README.markdown
  def results
    idx=0
    hash = {}
    CSV.foreach(params[:file]) do |row|
      idx+=1
      next if idx == 1
      item = LineItem.from(row)
      item.save
      year_month = item.item_date.strftime('%Y-%m')
      hash[year_month] ||= 0
      hash[year_month] += item.item_amount
    end
    @report = report_on_all
  end

  def report_on_all
    #select sum(item_amount), strftime('%Y-%m', item_date) as year_month from line_items group by year_month
    report = LineItem.select("sum(item_amount) as amount, strftime('%Y-%m', item_date) as year_month"). 
      group('year_month')
    report
  end
end
