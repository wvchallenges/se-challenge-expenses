class Import < ApplicationRecord
  validates :uploaded_file, presence: { message: "must be selected" }

  include FileUploadConcern
  upload :file, :uploaded_file 
end
