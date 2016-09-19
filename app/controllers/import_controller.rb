require 'csv'

class ImportController < ApplicationController
  def form
  end

  # Assumptions:
  #   - File always exists
  #   - Is always well formed csv file (according to spec in README.markdown)
  def results
    report = MonthlyExpenseReport.new
    # TODO: delegate to a csv parser
    CSV.foreach(params[:file].path, skip_lines: /^date,category.*$/) do |row|
      item = LineItem.from(row)
      item.save
      report.add(item)
    end
    return render json: report.monthly.to_json
  end
end
