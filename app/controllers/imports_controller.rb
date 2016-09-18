class ImportsController < ApplicationController
  
  def create
    if import.save
    else
      render "new"
    end
  end

  private
  def import_params
    params.require(:import).permit(:original_filename, :file)
  end

end
