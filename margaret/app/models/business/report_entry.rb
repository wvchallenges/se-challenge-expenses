class Business::ReportEntry < ActiveRecord::Base
  belongs_to :report, class_name: "Business::Report", foreign_key: :business_report_id
  belongs_to :business, class_name: "Business::Business", foreign_key: :business_id # cached in model
end