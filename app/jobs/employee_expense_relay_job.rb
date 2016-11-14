class EmployeeExpenseRelayJob < ApplicationJob
  
  def perform(employee_expense)
    ActionCable.server.broadcast 'employee_expenses_channel',
    	employee_expense: render_expense(employee_expense)
  end

private

	def render_expense(expense)
		ApplicationController.renderer.render(partial: 'employee_expenses/employee_expense',
			locals:{ employee_expense: expense, group_id: expense.date.strftime("%m-%Y"), index: 0 })
	end

end