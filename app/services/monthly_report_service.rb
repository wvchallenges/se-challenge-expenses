class MonthlyReportService < ApplicationService
  def initialize(upload = nil)
    @upload = upload
  end

  def monthly_reports
    reports = initialize_reports

    expenses_grouped_by_month.each do |row|
      reports[row['year_month']] = {
        pre_tax_amount: Money.new(row['pre_tax_amount_cents']),
        tax_amount: Money.new(row['tax_amount_cents'])
      }
    end

    reports
  end

  private

  attr_reader :upload

  def expenses_grouped_by_month
    result = connection.exec_query(expenses_grouped_by_month_query.to_sql)
    result.to_hash
  end

  def expenses_grouped_by_month_query
    expenses = expenses_table
    query = expenses.project(year_month_column,
                             expenses[:pre_tax_amount_cents].sum.as('pre_tax_amount_cents'),
                             expenses[:tax_amount_cents].sum.as('tax_amount_cents'))
                    .group('year_month')
    upload.present? ? scope_by_upload(query) : query
  end

  def scope_by_upload(query)
    query.where(expenses_table[:upload_id].eq(upload.id))
  end

  def year_month_column
    Arel::Nodes::SqlLiteral.new("TO_CHAR(date, 'YYYY-MM') AS year_month")
  end

  def initialize_reports
    start_date, end_date = expenses_start_and_end_dates
    return {} unless start_date.present? && end_date.present?

    start_date = Date.strptime start_date
    end_date = Date.strptime end_date

    initialize_reports_for_range(start_date, end_date)
  end

  def expenses_start_and_end_dates
    expenses = expenses_table
    query = expenses.project(expenses[:date].minimum, expenses[:date].maximum)
    query = scope_by_upload(query) if upload.present?

    result = connection.select_one(query.to_sql)
    [result['min'], result['max']]
  end

  def initialize_reports_for_range(min_date, max_date)
    months_in_range = {}
    date = min_date

    while date <= max_date
      months_in_range[date.strftime('%Y-%m')] = {
        pre_tax_amount: Money.new(0),
        tax_amount: Money.new(0)
      }
      date = date.next_month
    end

    months_in_range
  end

  def connection
    ActiveRecord::Base.connection
  end

  def expenses_table
    Expense.arel_table
  end
end
