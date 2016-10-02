class TaxName < ApplicationRecord
  has_many :expenses, dependent: :destroy
  
  validates :name, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }
end