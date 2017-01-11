class Category < ApplicationRecord
  has_many :expenses

  validates_presence_of :name
end
