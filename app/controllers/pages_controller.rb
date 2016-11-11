require 'csv'

class PagesController < ApplicationController
  def home
    @reports = MonthlyReportService.new.monthly_reports
  end

  def upload
    file = params[:file]

    begin
      ExpenseImportService.new.import_file CSV.open(file.path, headers: true)
      flash[:success] = 'Success!'
    rescue ExpenseImportService::ImportError => error
      flash[:danger] = error.message
    end

    redirect_to action: :home
  end
end
