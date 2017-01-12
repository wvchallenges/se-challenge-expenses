class ExpenseDocumentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def import
    begin
      ExpenseDocument.import(params[:file])
      redirect_to employee_expenses_path, notice: "Expenses imported."
    rescue
      redirect_to employee_expenses_path, notice: "Invalid CSV expense file."
    end
  end

end