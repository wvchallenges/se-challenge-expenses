class EmployeesController < ApplicationController
  def index
    @employees = Employee.all
  end
  
  def new
    @employee = Employee.new
  end
  
  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      flash[:success] = "Employee created."
      redirect_to @employee
    else
      render 'new'
    end
  end
  
  def show
    @employee = Employee.find(params[:id])
  end
  
  def edit
    @employee = Employee.find(params[:id])
  end
  
  def update
    @employee = Employee.find(params[:id])
    if @employee.update_attributes(employee_params)
      flash[:success] = "Employee info updated."
      redirect_to @employee
    else
      render 'edit'
    end
  end
  
  def destroy
    Employee.find(params[:id]).destroy
    flash[:success] = "Employee deleted."
    redirect_to employees_url
  end
  
  private

    def employee_params
      params.require(:employee).permit(:name, :address)
    end
end