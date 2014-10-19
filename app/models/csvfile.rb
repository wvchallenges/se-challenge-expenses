class Csvfile < ActiveRecord::Base
  include CsvDecoder

  attr_accessible :name

  has_many :expenses

end
