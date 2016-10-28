class HomeController < ApplicationController

  def index
    render :index
  end

  def upload
    uploaded_io = params[:expense_report]

    path_on_disk = Rails.root.join('public', 'uploads', uploaded_io.original_filename)

    File.open(path_on_disk, 'wb') do |file|
      file.write(uploaded_io.read)
    end

    csv_file = CSVFileBuilder.create(path_on_disk)

    CSVWorker.perform_async(csv_file.id)

    redirect_to action: :check_status, check_id: csv_file.check_id
  end

  def check_status
    csv_file = CSVFile.find_by_check_id(params[:check_id])
    if !csv_file
      raise ActionController::RoutingError.new('Not Found')
    elsif csv_file.processing?
      render :check_status
    elsif csv_file.processed?
      redirect_to action: :report, check_id: csv_file.check_id
    end
  end

  def report
    csv_file = CSVFile.find_by_check_id(params[:check_id])

    @report = ReportGenerator.generate_expense_report(csv_file)

    render :report
  end
end
