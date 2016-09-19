require 'rails_helper';

RSpec.describe CsvImporter do
  
  describe ".process" do
    let(:import) { Import.new uploaded_file: "spec/support/sample.csv" }

    before do
      CsvImporter.process import
    end

    it "should add expense" do
      expect(import.expenses.size).to eq(1)
    end

    describe "imported data" do
      let(:expense) { import.expenses.first }
      let(:category) { expense.category }
      let(:employee) { expense.employee }

      it "should import expense" do
        expect(expense.date).to eq(Date.new(2013, 12, 1))
        expect(expense.description).to eq("Taxi ride")
        expect(expense.pretax_amount).to eq(350)
        expect(expense.tax_amount).to eq(31.06)
      end

      it "should import category" do
        expect(category.name).to eq("Travel")
      end

      it "should import employee" do
        expect(employee.name).to eq("Don Draper")
        expect(employee.address).to eq("783 Park Ave, New York, NY 10021")
      end
    end
  end
end
