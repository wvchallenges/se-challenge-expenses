class Upload < ActiveRecord::Base
  has_many :expenses

  validates :file_name,
            presence: true

  default_scope { order('created_at DESC') }
end
