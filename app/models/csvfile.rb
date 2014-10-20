class Csvfile < ActiveRecord::Base

  include CsvDecoder
  include MonthlyExpenseReport

  attr_accessible :name

  has_many :expenses

end
