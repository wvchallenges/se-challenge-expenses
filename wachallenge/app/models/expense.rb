class Expense < ActiveRecord::Base
  belongs_to :report

  def self.upload_from_csv(file_param)
  	CSV.foreach(file_param.path, headers: true, skip_blanks: true, encoding:'windows-1256:utf-8') do |expense|
  		expense = expense.to_hash

  		Rails.logger.error expense.keys
  		Expense.create do |attrs|
  			attrs.date =  Date.strptime(expense["date"], "%m/%d/%Y")
  			attrs.category = expense["category"]
  			attrs.employee_name = expense["employee name"]
  			attrs.employee_address = expense["employee address"]
  			attrs.description = expense["expense description"]
  			attrs.pre_tax_amount = expense["pre-tax amount"]
  			attrs.tax_name = expense["tax name"]
  			attrs.tax_amount = expense["tax amount"]
  		end
  	end
  end
end
