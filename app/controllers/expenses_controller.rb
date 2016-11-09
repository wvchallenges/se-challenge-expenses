class ExpensesController < ApplicationController
  before_action :set_expense, only: [:show, :edit, :update, :destroy]

  # GET /expenses
  # GET /expenses.json
  def index
    @expenses = Expense.all
    # getting all the expenses for all employees
    @total_expenses = Expense.get_expenses
    # getting all expenses for taxes only
    @total_tax_amount = Expense.tax_amount_total
    # getting all expesne 
    @total_pre_tax_amount = Expense.get_pre_tax_amount_total
  end

  # GET /expenses/1
  # GET /expenses/1.json
  def show
  end

  # GET /expenses/new
  def new
    @expense = Expense.new
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

  def  import_info
    #checks if there was a file  otherwise returns user to upload page
    if params[:file]
      csv_document = CSV.read( params[:file].path , headers: true )
      # shows the total for the csv document just uploaded 
      session[:current_total] = Expense.add_expenses_from_csv( csv_document )
      redirect_to expenses_url
    else
        #redirects and lets the user know that they forgot file
        redirect_to "application#{index}", notice: 'You forgot to select a file.'
    end
  end 

  #lists expenses in two formats first is year month and second is month only 
  # I did not know which on of them you meant so I implemented both
  def monthly_expenses
    # gets expense based on year month 
    # gets expenses based on month 
    @year_month_expenses = Expense.get_monthly_and_year_expenses
    @monthly_expenses = Expense.get_monthly_expenses

    # getting all the expenses 
    @total_expenses = Expense.get_expenses
    # getting all expenses for taxes only
    @total_tax_amount = Expense.tax_amount_total
    # getting all expense  before taxes apply 
    @total_pre_tax_amount = Expense.get_pre_tax_amount_total
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Never trust parameters from the scary Internet, only allow the white list through.
    def expense_params
      params[:expense]
    end
end
