class ExpensesController < ApplicationController
  def index
    @expenses = Expense.all
  end
  
  def new
    @expense = Expense.new
  end
  
  def create
    @expense = Expense.new(expense_params)
    if @expense.saveRecord(params[:expense][:extra][:employee_name],
                          params[:expense][:extra][:employee_address],
                          params[:expense][:extra][:category_name],
                          params[:expense][:extra][:tax_name])
      flash[:success] = "Expense record added."
      redirect_to expenses_url
    else
      render "new"
    end
  end
  
  def show
    @expense = Expense.find(params[:id])
    redirect_to edit_expense_url(@expense)
  end
  
  def edit
    @expense = Expense.find(params[:id])
    @employee_name_origin = @expense.employee.name
    @employee_address_origin = @expense.employee.address
    @category_name_origin = @expense.category.name
    @tax_name_origin = @expense.tax_name.name
  end
  
  def update
    @expense = Expense.find(params[:id])
    @expense.assign_attributes(expense_params)
    if @expense.saveRecord(params[:expense][:extra][:employee_name],
                          params[:expense][:extra][:employee_address],
                          params[:expense][:extra][:category_name],
                          params[:expense][:extra][:tax_name])
      flash[:success] = "Expense record updated."
      redirect_to expenses_url
    else
      render "edit"
    end
  end
  
  def destroy
    Expense.find(params[:id]).destroy
    flash[:success] = "Expense record deleted."
    redirect_to expenses_url
  end
  
  def upload
  end
  
  def file
  end
  
  private

    def expense_params
      params.require(:expense).permit(:date, :description, :pre_tax_amount,
      :tax_amount, :employee_id, :category_id, :tax_name_id)
    end
end
