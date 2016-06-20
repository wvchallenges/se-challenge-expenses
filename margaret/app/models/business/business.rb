require 'elasticsearch/model'

class Business::Business < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  self.table_name = 'businesses'

  has_many :reports, class_name: "Business::Report", foreign_key: :business_id
  # Instead of doing a through, caching the business ID for faster lookup
  has_many :report_entries, class_name: "Business::ReportEntry", foreign_key: :business_id

  validates :name, :address, presence: true
  validates :name, uniqueness: true


end