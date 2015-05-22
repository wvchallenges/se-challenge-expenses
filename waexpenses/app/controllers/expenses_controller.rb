class ExpensesController < ApplicationController
  before_action :set_expense, only: [:show, :edit, :update]

  # GET /expenses
  # GET /expenses.json
  def index
    @expenses = Expense.order(date: :desc)

    @dates_and_totals = Expense.total_by_month(@expenses)
  end

  # GET /expenses/1
  # GET /expenses/1.json
  def show
  end

  def import
    begin
      #-- convert to a tuple of imported vs read.
      expenses_imported = CsvImport.import params[:file]
      notice = ""
      if expenses_imported == 0
        notice = "No expenses imported. Either the file is in the wrong format, or it contains already-imported expenses"
      elsif expenses_imported == 1
        notice = "One expense imported."
      else
        notice = expenses_imported.to_s + " expenses imported."
      end

      redirect_to root_url, notice: notice
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
