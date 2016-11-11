class PagesController < ApplicationController
  def home
    @uploads = Upload.all.map { |upload| UploadPresenter.new(upload) }
    @selected_upload = Upload.find(params[:upload_id]) if params[:upload_id]
    @reports = MonthlyReportService.new(@selected_upload)
                                   .monthly_reports
                                   .map { |month, data| MonthlyReportPresenter.new(month, data) }
  end

  def upload_file
    uploaded_file = params[:file]

    begin
      Upload.transaction do
        upload = Upload.create file_name: uploaded_file.original_filename
        CsvExpenseImportService.new(upload).import_file uploaded_file.path

        flash[:success] = 'Success!'
        redirect_to action: :home, upload_id: upload.id
      end
    rescue CsvExpenseImportService::ImportError => error
      flash[:danger] = error.message
      redirect_to action: :home
    end
  end
end
