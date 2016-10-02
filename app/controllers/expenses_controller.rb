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
    @file = params[:upload][:file]
    @override = params[:upload][:override]
    if @file == nil
      flash[:danger] = "Please choose a file to upload."
      render "upload"
    else
      if @override == "1"
        Expense.destroy_all
        Employee.destroy_all
        Category.destroy_all
        TaxName.destroy_all
      end
      @file_content = @file.read
      require "csv"
      CSV.parse(@file_content, headers: true) do |row|
        @expense = Expense.new
        @expense.date = Date.strptime(row['date'], "%m/%d/%Y")
        @expense.description = row['expense description']
        @expense.pre_tax_amount = BigDecimal.new(row['pre-tax amount'].tr(",",""))
        @expense.tax_amount = BigDecimal.new(row['tax amount'].tr(",",""))
        
        @expense.saveRecord(
          row['employee name'],
          row['employee address'],
          row['category'],
          row['tax name'])
      end
      flash[:success] = "File is parsed successfully."
      redirect_to root_url
    end
  end
  
  private

    def expense_params
      params.require(:expense).permit(:date, :description, :pre_tax_amount,
      :tax_amount, :employee_id, :category_id, :tax_name_id)
    end
end
