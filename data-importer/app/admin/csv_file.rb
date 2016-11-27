ActiveAdmin.register CsvFile do
	config.filters = false
	permit_params :file

	form do |f|
    f.inputs "Upload" do
      f.input :file, required: true, as: :file
    end
    f.actions
  end

  show do

  	attributes_table do
      row :id
      row :created_at

      row "File Name" do
        csv_file.file_file_name
      end
    end
    
    panel "Monthly Summary of Expenses" do
      # in postgre you can do this with sql
      # this solution will be rather slow since a lot is done in ruby
      grouped_by_month = Expense.where(csv_file_id: csv_file.id).group_by{ |u| u.date.beginning_of_month }

      render(partial: "admin/dashboard/monthly_expenses", locals: { grouped_by_month: grouped_by_month })
    end
    
  end
end
