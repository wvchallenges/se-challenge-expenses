require 'csv'

module Utility
  class CsvFile

    # Creates a new CsvFile from an array of CSV lines
    # This assumes the first line is the headers
    def initialize(contentsAsLines)

      rows = Array.new

      contentsAsLines.each do |line|

        columnValues = CSV.parse_line(line)

        localRow = CsvRow.new(columnValues)

        rows.push(localRow)
      end

      @headerRow = rows[0]
      @rows = rows.drop(1)

    end

    def headerRow
      @headerRow
    end

    def rows
      @rows
    end

    class CsvRow

      def initialize(columnValues)
        @columnValues = columnValues
      end

      def values
        @columnValues
      end

    end

  end
end
