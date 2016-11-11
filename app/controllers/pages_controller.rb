class PagesController < ApplicationController
  def home
    @reports = MonthlyReportService.new
                                   .monthly_reports
                                   .map { |month, data| MonthlyReportPresenter.new(month, data) }
    @uploads = Upload.all.map { |upload| UploadPresenter.new(upload) }
  end

  def upload
    uploaded_file = params[:file]

    begin
      Upload.transaction do
        upload = Upload.create file_name: uploaded_file.original_filename
        CsvExpenseImportService.new(upload).import_file uploaded_file.path
      end

      flash[:success] = 'Success!'
    rescue CsvExpenseImportService::ImportError => error
      flash[:danger] = error.message
    end

    redirect_to action: :home
  end
end
