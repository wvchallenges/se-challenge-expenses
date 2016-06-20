require 'csv'
class Business::Report < ActiveRecord::Base
  belongs_to :business, class_name: "Business::Business", foreign_key: :business_id
  has_many :entries, class_name: "Business::ReportEntry", foreign_key: :business_report_id

  validates :business_id, presence: true

  def to_csv(options: {}, filter: lambda {|x| x})
    CSV.generate(options) do |csv|
      csv << self.class.input_schema
      entries.select(&filter).each do |entry|
        csv << [
          entry.date.try(:strftime, "%m/%d/%Y"),
          entry.category,
          entry.employee_name,
          entry.employee_address,
          entry.expense_description,
          ("%.2f" % (entry.amount_before_tax / 100.00)).to_s,
          entry.tax_name,
          ("%.2f" % (entry.tax_amount / 100.00)).to_s,
        ]
      end
    end
  end

  def filename
    "report_#{business.name.gsub(/[\s']/, '_')}_#{self.created_at.to_s.gsub(/[\s']/, '_')}"
  end

  class << self
    def input_schema
      ["date","category","employee name","employee address","expense description","pre-tax amount","tax name","tax amount"]
    end

    def entry_schema
      %w(date category employee_name employee_address expense_description amount_before_tax tax_name tax_amount)
    end

    def construct(business:)
      new(business: business)
    end
  end
end