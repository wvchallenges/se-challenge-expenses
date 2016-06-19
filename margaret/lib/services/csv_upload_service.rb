require 'csv'

class Services::CsvUploadService < Services::BaseService
  attr_accessor :business, :csv, :report

  def process
    result = true
    file_contents = CSV.read(csv.path)
    file_contents.shift # throw away the headers

    ActiveRecord::Base.transaction do
      result = create_report && create_entries(file_contents)

      unless result
        raise ActiveRecord::Rollback
      end
    end

    result
  end

  protected

    def create_report
      self.report = Business::Report.construct(business: business)
      self.copy_errors_from(report) unless report.save
      self.errors.blank?
    end

    def create_entries(contents)
      result = true
      csv_to_report_entries(contents).each do |report_entry|
        entry = Business::ReportEntry.construct(report_entry.merge(business: business, report: report))
        result &= entry.save
      end

      # TODO - reporting on what went wrong with the parsing
      result
    end

    def csv_to_report_entries(contents)
      [].tap do |array|
        contents.each do |contents_line|
          array << Hash[Business::Report.entry_schema.map(&:to_sym).zip(contents_line)]
        end
      end
    end
end