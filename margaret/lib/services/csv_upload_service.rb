require 'csv'

class Services::CsvUploadService < Services::BaseService
  attr_accessor :business, :csv, :report, :file_contents

  def process
    result = true

    ActiveRecord::Base.transaction do
      result = read_csv_file && create_report && create_entries

      unless result
        raise ActiveRecord::Rollback
      end
    end

    result
  end

  protected

    def read_csv_file
      if csv.blank?
        self.errors.add(:csv, "please upload .csv file")
      else
        contents = CSV.read(csv.path)
        contents.shift
        self.file_contents = contents
      end

      self.errors.blank?
    end

    def create_report
      self.report = Business::Report.construct(business: business)
      self.copy_errors_from(report) unless report.save

      self.errors.blank?
    end

    def create_entries
      result = true
      csv_to_report_entries.each do |report_entry|
        entry = Business::ReportEntry.construct(report_entry.merge(report: report))
        result &= entry.save
      end

      # TODO - reporting on what went wrong with the parsing
      result
    end

    def csv_to_report_entries
      [].tap do |array|
        self.file_contents.each do |contents_line|
          array << Hash[Business::Report.entry_schema.map(&:to_sym).zip(contents_line)]
        end
      end
    end
end