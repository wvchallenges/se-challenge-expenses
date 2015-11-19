require 'csv'

class Parser
  def self.parse!(csv)
    raw_lines(csv).map do |line|
      date_array = line[0].split('/').map(&:to_i)
      date = Date.new(date_array[2], date_array[0], date_array[1])

      {
        employee: {
          name: line[2],
          address: line[3]
        },
        tax: {
          name: line[6]
        },
        category: {
          name: line[1]
        },
        expense: {
          date: date,
          description: line[4],
          pre_tax_amount: line[5].to_f,
          tax_amount: line[7].to_f
        }
      }
    end
  end

  private

  def self.raw_lines(csv)
    # Skip the header
    CSV.parse(csv)[1..-1].map do |line|
      line.map do |item|
        (item || "").strip
      end
    end
  end
end
