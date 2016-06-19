class Business::ReportEntry < ActiveRecord::Base
  belongs_to :report, class_name: "Business::Report", foreign_key: :business_report_id
  belongs_to :business, class_name: "Business::Business", foreign_key: :business_id # cached in model

  # validations if required

  class << self
    def convert_amount_to_cents(amount)
      amount.gsub(/[,\.]/, '').to_i
    end

    def parse_date(date)
      Date.strptime(date, "%m/%d/%Y")
    end

    def construct(business:, report:, date:, category:, employee_name:, employee_address:, expense_description:, amount_before_tax:, tax_name:, tax_amount:)

      new(business: business, report: report, date: parse_date(date), category: category, employee_name: employee_name, employee_address: employee_address, expense_description: expense_description, amount_before_tax: convert_amount_to_cents(amount_before_tax), tax_name: tax_name, tax_amount: convert_amount_to_cents(tax_amount))
    end
  end
end