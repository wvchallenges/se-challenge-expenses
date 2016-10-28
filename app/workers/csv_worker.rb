require 'CSV'

class CSVWorker
  include Sidekiq::Worker

  def perform(csv_file_id)
    csv_file = CSVFile.find(csv_file_id)

    res = CSVProcessor.process(csv_file)

    if res
      csv_file.processed!
    end
  end
end
