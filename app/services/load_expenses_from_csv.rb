require 'CSV'

class LoadExpensesFromCSV
  attr_reader :expenses_file

  def self.call(options)
    new(options).call
  end

  def initialize(options = {})
    @expenses_file = options.fetch(:expenses_file)
  end

  def call
    objects = []
    CSV.foreach(expenses_file.file.path, headers: true) do |row|
      properties = Hash[ row.to_h.map { |k, v| [k.gsub(/[ -]/, '_'), v] } ]
      objects.push properties
    end
    expenses_file.expenses.create! objects
  end
end
