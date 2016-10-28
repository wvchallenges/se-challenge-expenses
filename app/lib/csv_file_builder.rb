class CSVFileBuilder
  def self.create(location)
    CSVFile.create(location: location, check_id: SecureRandom.uuid, status: CSVFile::STATUS_FILE_UPLOADED)
  end
end
