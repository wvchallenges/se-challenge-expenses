class Employee < ActiveRecord::Base
  belongs_to :report

  def self.upload_from_csv(file_param)
  	CSV.foreach(file_param.path, headers: true, skip_blanks: true, encoding:'windows-1256:utf-8') do |employee|
  		employee = employee.to_hash

  		Rails.logger.error employee.keys
  		Employee.create do |attrs|
  			attrs.date =  Date.strptime(employee["date"], "%m/%d/%Y")
  			attrs.category = employee["category"]
  			attrs.name = employee["employee name"]
  			attrs.address = employee["employee address"]
  			attrs.description = employee["expense description"]
  			attrs.pre_tax_amount = employee["pre-tax amount"]
  			attrs.tax_name = employee["tax name"]
  			attrs.tax_amount = employee["tax amount"]
  		end
  	end
  end
end
