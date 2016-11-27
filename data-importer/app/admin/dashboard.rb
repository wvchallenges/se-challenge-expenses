require 'csv'

ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Monthly Summary of Most Recent File Upload" do
          maximum_file_id = Expense.maximum(:csv_file_id)

          # in postgre you can do this with sql
          # this solution will be rather slow since a lot is done in ruby
          grouped_by_month = Expense.where(csv_file_id: maximum_file_id).group_by{ |u| u.date.beginning_of_month }

          render(partial: "admin/dashboard/monthly_expenses", locals: { grouped_by_month: grouped_by_month })
        end
      end

      column do
        panel "Overall Monthly Expenses" do
          grouped_by_month = Expense.all.group_by{ |u| u.date.beginning_of_month }

          render(partial: "admin/dashboard/monthly_expenses", locals: { grouped_by_month: grouped_by_month })
        end
      end
    end
  end # content

end
