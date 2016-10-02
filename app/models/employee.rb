class Employee < ApplicationRecord
  has_many :expenses, dependent: :destroy
  
  validates :address, presence: true, length: { maximum: 255 }
  validates :name, presence: true, length: { maximum: 31 }, uniqueness: { case_sensitive: false }
end