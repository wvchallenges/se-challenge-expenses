class Upload < ActiveRecord::Base
  validates :file_name,
            presence: true,
            uniqueness: true
end
