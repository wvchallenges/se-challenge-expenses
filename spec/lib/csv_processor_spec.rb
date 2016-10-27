require 'spec_helper'

RSpec.describe CSVProcessor, type: :integration do
  let(:csv_file) { create(:csv_file, :saved, :simple) }

  context '.proccess' do

    subject { described_class.process(csv_file) }

    it 'opens the file' do
      expect(CSV).to receive(:foreach).with csv_file.location

      subject
    end

    it 'creates an expense entry' do
      expect { subject }.to change { ExpenseEntry.count }.by(1)

      expense_entry = ExpenseEntry.first

      expect(expense_entry.date).to eq(Date.new(2013, 12, 1))
      expect(expense_entry.description).to eq("Taxi ride")
      expect(expense_entry.pre_tax_amount).to eq(35000)
      expect(expense_entry.tax_amount).to eq(3106)
    end

    it 'creates an employee and associates it to the ExpenseEntry' do
      expect { subject }.to change{Employee.count}.by(1)

      emp = Employee.first
      expense_entry = ExpenseEntry.first

      expect(emp.name).to eq("Don Draper")
      expect(emp.address).to eq("783 Park Ave, New York, NY 10021")
      expect(expense_entry.employee).to eq(emp)
    end

    context 'employee already exists' do
      let!(:employee) { create(:employee, name: "Don Draper", address: "783 Park Ave, New York, NY 10021") }

      it 'does not create a new employee and associates the existing employee' do
        expect { subject }.to change{Employee.count}.by(0)

        expect(ExpenseEntry.first.employee).to eq(employee)
      end
    end

    it 'creates a category and associates it to the ExpenseEntry' do
      expect { subject }.to change{Category.count}.by(1)

      category = Category.first
      expense_entry = ExpenseEntry.first

      expect(category.name).to eq("Travel")
      expect(expense_entry.category).to eq(category)
    end

    context 'category already exists' do
      let!(:category) { create(:category, name: "Travel") }

      it 'does not create a new category and associates the existing category' do
        expect { subject }.to change{Category.count}.by(0)

        expect(ExpenseEntry.first.category).to eq(category)
      end
    end

    it 'creates a tax type' do
      expect { subject }.to change{TaxType.count}.by(1)

      tax_type = TaxType.first
      expense_entry = ExpenseEntry.first

      expect(tax_type.name).to eq("NY Sales tax")
      expect(expense_entry.tax_type).to eq(tax_type)
    end

    context 'tax type already exists' do
      let!(:tax_type) { create(:tax_type, name: "NY Sales tax") }

      it 'does not create a new category and associates the existing category' do
        expect { subject }.to change{TaxType.count}.by(0)

        expect(ExpenseEntry.first.tax_type).to eq(tax_type)
      end
    end
  end

end
