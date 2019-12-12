class Employee < ApplicationRecord
  validates :name, presence: true

  def self.from_csv row
    find_or_initialize_by \
      name: row["employee name"],
      address: row["employee address"]
  end
end
