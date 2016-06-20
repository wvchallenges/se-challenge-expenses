class Business::Report < ActiveRecord::Base
  belongs_to :business, class_name: "Business::Business", foreign_key: :business_id
  has_many :entries, class_name: "Business::ReportEntry", foreign_key: :business_report_id

  validates :business_id, presence: true

  class << self
    def entry_schema
      %w(date category employee_name employee_address expense_description amount_before_tax tax_name tax_amount)
    end

    def construct(business:)
      new(business: business)
    end
  end
end