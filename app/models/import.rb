class Import < ApplicationRecord
  has_and_belongs_to_many :expenses, join_table: "imported_expenses"
  validates :uploaded_file, presence: { message: "must be selected" }

  include FileUploadConcern
  upload :file, :uploaded_file 

  after_create_commit :process_uploaded_file

  protected
  def process_uploaded_file
    CsvImporter.process self
  end
end
