class ExpensesFile < ApplicationRecord
  has_many :expenses, dependent: :destroy

  has_attached_file :file
  validates_attachment :file, presence: true, :content_type => { content_type: 'text/csv' }
end
