class Tax < ApplicationRecord
  has_many :expenses

  validates_presence_of :name
end
