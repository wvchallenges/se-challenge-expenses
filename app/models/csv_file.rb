class CSVFile < ApplicationRecord
  STATUS_FILE_UPLOADED = 'file_uploaded'
  STATUS_PROCESSING = 'processing'
  STATUS_PROCESSED = 'processed'
  STATUS_FAILED_PROCESSING = 'failed_processing'

  def processing
    self.status = STATUS_PROCESSING
  end

  def processing!
    processing
    save!
  end

  def processing?
    status == STATUS_PROCESSING
  end

  def processed
    self.status = STATUS_PROCESSED
  end

  def processed!
    processed
    save!
  end

  def processed?
    status == STATUS_PROCESSED
  end

  def failed_processing
    self.status = STATUS_FAILED_PROCESSING
  end

  def failed_processing!
    failed_processing
    save!
  end

  def failed_processing?
    status == STATUS_FAILED_PROCESSING
  end
end
