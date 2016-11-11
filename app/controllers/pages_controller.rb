class PagesController < ApplicationController
  def home
    @reports = MonthlyReportService.new.monthly_reports
  end

  def upload
    uploaded_file = params[:file]

    begin
      Upload.transaction do
        upload = Upload.create file_name: uploaded_file.original_filename
        ExpenseImportService.new(upload).import_file uploaded_file.path
      end

      flash[:success] = 'Success!'
    rescue ExpenseImportService::ImportError => error
      flash[:danger] = error.message
    end

    redirect_to action: :home
  end
end
