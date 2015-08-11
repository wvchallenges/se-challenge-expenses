class ExpensesController < ApplicationController

  # GET '/'
  def show
    @months = Expense.all.select("date, total_amount").group_by{|x| x.date.strftime("%B, %Y")}
  end

  # POST '/new_data'
  def upload
    begin
      file = params[:data].open
    rescue Exception => e
      flash[:alert] = "An error has occured. Please upload a valid CSV"
      return redirect_to root_path
    end

    Expense.upload_csv_file(file)
    flash[:notice] = 'File successfully uploaded. Monthly expenses updated'
    redirect_to root_path
  end
end
