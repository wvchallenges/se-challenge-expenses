class ImportersController < ApplicationController
  before_action :set_categories, only: [:index]
  before_action :set_taxes, only: [:index]
  before_action :set_employees, only: [:index]
  before_action :set_expenses, only: [:index]

  def index
    @categories = Category.all
    @taxes = Tax.all
    @employees = Employee.all
    @expenses = Expense.all
  end

  def create
    if csv_file.nil?
      flash[:notice] = 'Error: No file uploaded'
      redirect_to action: :index and return
    end

    begin
      contents = csv_file.read
      rows = Parser.parse!(contents)

      @expenses = Importer.import!(rows)
    rescue => e
      flash[:notice] = "Error parsing the CSV file.\n#{e.message}\n#{e.backtrace}"

      redirect_to action: :index and return
    end

    flash[:notice] = 'Successfuly Parsed the CSV File!'
    @monthly_expenses = @expenses
      .group_by { |expense| expense.date.strftime('%Y %B') }
  end

  private

  def set_categories
    @categories = Category.all
  end

  def set_taxes
    @taxes = Tax.all
  end

  def set_employees
    @employees = Employee.all
  end

  def set_expenses
    @expenses = Expense.all
  end

  def csv_file
    params[:file]
  end
end
