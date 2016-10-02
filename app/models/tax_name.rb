class TaxName < ApplicationRecord
  validates :name, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }
end