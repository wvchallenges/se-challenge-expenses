class Business::ReportEntry < ActiveRecord::Base
  belongs_to :report, class_name: "Business::Report", foreign_key: :business_report_id
  belongs_to :business, class_name: "Business::Business", foreign_key: :business_id # cached in model for faster lookup

  validates :business_id, :business_report_id, :date, :category, :employee_name, :employee_address, :expense_description, :amount_before_tax, :tax_name, :tax_amount, presence: true

  update_index('report_entry#report_entry') { self }

  class << self
    def convert_amount_to_cents(amount)
      amount.try(:gsub, /[,\.]/, '').to_i
    end

    def parse_date(date)
      Date.strptime(date, "%m/%d/%Y")
    end

    def construct(report:, date:, category:, employee_name:, employee_address:, expense_description:, amount_before_tax:, tax_name:, tax_amount:)

      new(business: report.business, report: report, date: parse_date(date), category: category, employee_name: employee_name, employee_address: employee_address, expense_description: expense_description, amount_before_tax: convert_amount_to_cents(amount_before_tax), tax_name: tax_name, tax_amount: convert_amount_to_cents(tax_amount))
    end
  end
end