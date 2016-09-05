class ExpensesController < ApplicationController
  require 'csv'
  before_action :set_expense, only: [:show, :edit, :update, :destroy]

  # GET /expenses
  # GET /expenses.json
  def index
    @expenses = Expense.all
  end

  # GET /expenses/1
  # GET /expenses/1.json
  def show
  end

  # GET /expenses/new
  def new
    @expense = Expense.new
  end

  # POST /expenses/import
  def import
    csv = CSV.parse(params[:file].tempfile, :headers => true)
    csv.each do |row|

      # find_or_create_by does not work with money-rails under Sqlite
      exp = Expense.where(
        date: Date.strptime(row["date"],'%m/%d/%Y'),
        category: Category.find_or_create_by(name: row['category']),
        employee: Employee.find_or_create_by(name: row['employee name'], address: row['employee address']),
        expense_description: row["expense description"],
        tax: Tax.find_or_create_by(name: row['tax name']),
      ).first

      if exp.nil?
        # create the expenses
        Expense.create!(
          date: Date.strptime(row["date"],'%m/%d/%Y'),
          category: Category.find_or_create_by(name: row['category']),
          employee: Employee.find_or_create_by(name: row['employee name'], address: row['employee address']),
          expense_description: row["expense description"],
          pre_tax_amount: row['pre-tax amount'].to_money,
          tax: Tax.find_or_create_by(name: row['tax name']),
          tax_amount: row['tax amount'].to_money
        )
      else
        # update values with file
        exp.update(
          pre_tax_amount: row['pre-tax amount'].to_money,
          tax_amount: row['tax amount'].to_money
        )
      end
    end
    redirect_to expenses_url
  end

  # GET /expenses/1/edit
  def edit
  end

  # POST /expenses
  # POST /expenses.json
  def create
    @expense = Expense.new(expense_params)

    respond_to do |format|
      if @expense.save
        format.html { redirect_to @expense, notice: 'Expense was successfully created.' }
        format.json { render :show, status: :created, location: @expense }
      else
        format.html { render :new }
        format.json { render json: @expense.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /expenses/1
  # PATCH/PUT /expenses/1.json
  def update
    respond_to do |format|
      if @expense.update(expense_params)
        format.html { redirect_to @expense, notice: 'Expense was successfully updated.' }
        format.json { render :show, status: :ok, location: @expense }
      else
        format.html { render :edit }
        format.json { render json: @expense.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /expenses/1
  # DELETE /expenses/1.json
  def destroy
    @expense.destroy
    respond_to do |format|
      format.html { redirect_to expenses_url, notice: 'Expense was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def expense_params
      params.require(:expense).permit(:date, :category_id, :employee_id, :expense_description, :pre_tax_amount, :tax_id, :tax_amount)
    end
end
