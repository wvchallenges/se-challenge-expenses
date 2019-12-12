class Category < ApplicationRecord
  validates :name, presence: true
  
  def self.from_csv row
    find_or_initialize_by name: row["category"]
  end
end
