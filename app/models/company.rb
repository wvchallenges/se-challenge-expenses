class Company < ActiveRecord::Base
  attr_accessible :date, :category, :name, :address, :exp_desc, :pre_tax, :tax_name, :tax_amount
  
  def self.import(file)
  	require 'date'
    CSV.foreach(file.path, headers: true) do |row|
  		company_hash = row.to_hash 	
      company_hash["date"] = Date.strptime(row[0], "%m/%d/%Y")
      company_hash["name"] = row[2]
      company_hash["address"] = row[3]
      company_hash["exp_desc"] = row[4]
      company_hash['pre_tax'] = row[5].gsub(/,/, '')
      company_hash["tax_name"] = row[6]
      company_hash["tax_amount"] = row[7]
      Company.create!(:date => company_hash["date"], :category => company_hash["category"], :name => company_hash["name"], :address => company_hash["address"], :exp_desc => company_hash["exp_desc"], :pre_tax => company_hash["pre_tax"], :tax_name => company_hash["tax_name"], :tax_amount => company_hash["tax_amount"])
	 end
	end
end
