class MonthlyReportPresenter < ApplicationPresenter
  include MoneyRails::ActionViewExtension

  def initialize(year_month_str, data)
    @year_month_str = year_month_str
    @data = data
  end

  def month
    year_month_str
  end

  def pre_tax_amount
    humanized_money_with_symbol(data[:pre_tax_amount])
  end

  def tax_amount
    humanized_money_with_symbol(data[:tax_amount])
  end

  private

  attr_reader :data, :year_month_str
end
