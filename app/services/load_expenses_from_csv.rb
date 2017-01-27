require 'CSV'

class LoadExpensesFromCSV
  attr_reader :file

  def self.call(options)
    new(options).call
  end

  def initialize(options = {})
    @file = options.fetch(:file)
  end

  def call
    objects = []
    CSV.foreach(file.path, headers: true) do |row|
      properties = Hash[ row.to_h.map { |k, v| [k.gsub(/[ -]/, '_'), v] } ]
      objects.push properties
    end
    Expense.create! objects
  end
end
