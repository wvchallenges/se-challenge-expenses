class CreateMonthlyExpensesView < ActiveRecord::Migration[5.0]
  def up
    say_with_time("CREATE VIEW monthly_expenses ...") do
      suppress_messages do
        execute <<-SQL
          CREATE VIEW monthly_expenses AS
          SELECT
            import_id,
            to_char(date, 'YYYY-MM') AS month,
            sum(pretax_amount) AS total_pretax_amount,
            sum(tax_amount) AS total_tax_amount
          FROM
            expenses INNER JOIN imported_expenses ON expenses.id = imported_expenses.expense_id
          GROUP BY import_id, month
          ORDER BY import_id, month;
        SQL
      end
    end
  end

  def down
    execute "DROP VIEW monthly_expenses;"
  end
end
