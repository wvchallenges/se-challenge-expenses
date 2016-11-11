class Upload < ActiveRecord::Base
  has_many :expenses

  validates :file_name,
            presence: true,
            uniqueness: true
end
