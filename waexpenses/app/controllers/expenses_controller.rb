class ExpensesController < ApplicationController
  before_action :set_expense, only: [:show, :edit, :update, :destroy]

  # GET /expenses
  # GET /expenses.json
  def index
    @expenses = Expense.order(date: :desc)
   
    @dates = []
    @total_expense = []
    @expenses.each do |expense|
      month_and_year = Date.new(expense.date.year,expense.date.month, 1)

      included = @dates.include? month_and_year
      if !included
        @dates << month_and_year
        @total_expense << expense.calculate_total_amount()
      else
        matched_index = @dates.index(month_and_year)
        if matched_index != nil
          @total_expense[matched_index] += expense.calculate_total_amount()
        end
      end
    end
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

  def import
    begin
      CsvImport.import params[:file]
      redirect_to root_url, notice: "File imported."
    rescue
      redirect_to root_url, notice: "Error importing CSV file."
    end
  end # end import


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def expense_params
      params[:expense]
    end
end


#-- filter by date
#@users = User.where(:created_at => start_date.to_time..end_date.to_time)
