class LineItem < ApplicationRecord

  # convert arr taken from csv row into a line item
  # example row: ["9/30/2013", "Office Supplies", "Larry Page", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Paper", " 200.00 ", "CA Sales tax", " 15.00 "]
  # return new LineItem object
  # assume: row is well formed
  def self.from(row)
    LineItem.new(
      item_date: Date.strptime(row[0], '%m/%d/%Y'),
      item_name: row[4],
      item_amount: row[5].strip.gsub(',','').to_f
    )
  end

  # Generate monthly report for all LineItems in the database
  # return: [{year_month: string, amount: float}, {...}, ...}]
  def self.monthly_report
    report = LineItem.select("sum(item_amount) as amount, strftime('%Y-%m', item_date) as year_month").
      group('year_month')
    report
  end
end
