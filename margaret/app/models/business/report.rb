class Business::Report < ActiveRecord::Base
  belongs_to :business, class_name: "Business::Business", foreign_key: :business_id
  has_many :entries, class_name: "Business::ReportEntry", foreign_key: :business_report_id
end