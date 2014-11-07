class FileImport < ActiveRecord::Base
  has_many :employee_expenses, dependent: :destroy
  attr_accessible :filename
end
