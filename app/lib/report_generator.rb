class ReportGenerator
  def self.generate_expense_report(csv_file)
    report = {}
    csv_file.expense_entries.order(:date).each do |entry|
      date = entry.date.strftime('%Y-%m')

      report_entry = report[date] || 0
      report_entry += entry.total_expense

      report[date] = report_entry
    end

    report
  end
end
