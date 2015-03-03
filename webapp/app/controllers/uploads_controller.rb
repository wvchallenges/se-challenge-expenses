class UploadsController < ApplicationController
  def index
    @employees = Employees.all
  end

  def upload
    begin
      UploadFile.save(params[:file])
      redirect_to uploads_path, text: "File has been uploaded successfully"

    rescue
      render text: "Something wrong just happened"
    end
  end
end
