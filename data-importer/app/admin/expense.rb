ActiveAdmin.register Expense do
  permit_params :tax, :category, :employee, :csv_file, :expense_description, :pretax_amount, :tax_amount, :date, :tax_id, :category_id, :employee_id

	filter :tax, as: :select
	filter :category, as: :select
	filter :employee
	filter :expense_description
	filter :pretax_amount
	filter :tax_amount
	filter :date

  index do
    column("Expense", :sortable => :id) {|expense| link_to "##{expense.id} ", admin_expense_path(expense) }
    column("Employee") {|expense| expense.employee.employee_name}
    column("Expense Description", :expense_description)
    column("Pre-tax Amount") {|expense| Money.us_dollar(expense.pretax_amount).format }
    column("Tax Amount") {|expense| Money.us_dollar(expense.tax_amount).format }
    column("Date", :date)
  end
end
