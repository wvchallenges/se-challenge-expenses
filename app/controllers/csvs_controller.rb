require 'csv' 

class CsvsController < ApplicationController

  def index

  end
  
  def create
    csv = CSV.parse(params[:file].read)
    render json: Csvfile.create_from_csv(csv,params[:file].original_filename)
  end

  def show
    render json: Csvfile.find(params[:id]).monthly_expense_report
  end

end
