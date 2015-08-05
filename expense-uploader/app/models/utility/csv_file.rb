module Utility
  class CsvFile

    def initialize(contentsAsLines)

      rows = Array.new

      contentsAsLines.each do |line|

        columnValues = line.split(",")

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
