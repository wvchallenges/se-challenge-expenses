class EmployeesController < ApplicationController
  before_action :set_employee, only: [:show, :destroy]

  # GET /employees
  # GET /employees.json
  def index
    @employees = Employee.all
  end

  # GET /employees/1
  # GET /employees/1.json
  def show
  end

  # GET /employees/new
  def new
    @employee = Employee.new
  end

  def upload
    if params[:file]
      Employee.upload(params[:file])
      redirect_to total_per_month_employees_path, notice: 'Employee was successfully uploaded.'
    else
      render :new
    end
  end

  def total_per_month
    @total_expenses = Employee.total_expenses
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee.destroy
    redirect_to employees_url, notice: 'Employee was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def employee_params
      params.fetch(:employee, {}).permit(:file)
    end
end
