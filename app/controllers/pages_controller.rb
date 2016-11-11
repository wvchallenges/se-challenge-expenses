require 'csv'

class PagesController < ApplicationController
  def home
    @reports = MonthlyReportService.new.monthly_reports
  end

  def upload
    file = params[:file]
    ExpenseImportService.new.import_file CSV.open(file.path, headers: true)
    redirect_to action: :home
  end
end
