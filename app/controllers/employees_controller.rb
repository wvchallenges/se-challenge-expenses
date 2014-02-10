class EmployeesController < ApplicationController
  def index
    @employees = Employee.order(:name)
  end
end
