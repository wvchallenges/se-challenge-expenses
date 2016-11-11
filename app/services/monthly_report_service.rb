class MonthlyReportService < ApplicationService
  def monthly_reports
    reports = {}

    expenses_grouped_by_month.each do |row|
      reports[row['year_month']] = {
        pre_tax_amount: Money.new(row['pre_tax_amount_cents']),
        tax_amount: Money.new(row['tax_amount_cents'])
      }
    end

    reports
  end

  private

  def expenses_grouped_by_month
    expenses = Arel::Table.new(:expenses)
    query = expenses.project(Arel::Nodes::SqlLiteral.new("TO_CHAR(date, 'YYYY-MM') AS year_month"),
                             expenses[:pre_tax_amount_cents].sum.as('pre_tax_amount_cents'),
                             expenses[:tax_amount_cents].sum.as('tax_amount_cents'))
    query = query.group('year_month')
    result = connection.exec_query(query.to_sql)
    result.to_hash
  end

  def connection
    ActiveRecord::Base.connection
  end
end
