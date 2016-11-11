class UploadPresenter < ApplicationPresenter
  delegate :id, :file_name, to: :upload

  def initialize(upload)
    @upload = upload
  end

  def uploaded_at
    upload.created_at
  end

  private

  attr_reader :upload
end
