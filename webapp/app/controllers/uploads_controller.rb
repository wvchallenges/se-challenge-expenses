class UploadsController < ApplicationController
  def index
    @employees = Employees.all
  end

  def upload
    begin
      if (params[:file]).nil?
        render text: "Please upload a file"
      else
        UploadFile.save(params[:file])
        redirect_to uploads_path
      end

    rescue
      render text: "Something wrong just happened"
    end
  end
end
