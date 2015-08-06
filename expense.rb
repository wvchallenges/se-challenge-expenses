require 'dm-core'
require 'dm-migrations'

DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/expenses.db")

class Song
  include DataMapper::Resource
  property :id, Serial
  property :date, Date
  property :category, String
  property :name, String
  property :address, String
  property :description, String
  property :pre_tax, Float
  property :tax_name, String
  property :tax, Float

  def released_on=(date)
    super Date.strptime(date, '%m/%d/%Y')
  end
end

DataMapper.finalize
DataMapper.auto_migrate!