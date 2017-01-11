require 'rails_helper'

describe ExpensesImporter do
  describe '#import' do
    it 'creates expense records successfully' do
      file = File.read(Rails.root.join('spec', 'fixtures', 'expenses_example.csv'))
      importer = ExpensesImporter.new(file_content: file)
      expect{importer.import}.to change{Expense.count}.from(0).to(19)

      expense = Expense.where(description: 'Client dinner').first
      expect(expense.category.name).to eq('Meals and Entertainment')
      expect(expense.employee.name).to eq('Don Draper')
      expect(expense.tax.name).to eq('NY Sales tax')
      expect(expense.employee.address).to eq('783 Park Ave, New York, NY 10021')
      expect(expense.pretax_amount).to eq(200.00)
      expect(expense.tax_amount).to eq(15.00)
      expect(expense.total_amount).to eq(215.00)
    end

    it 'does not import any records when one of them is invalid' do
      file = File.read(Rails.root.join('spec', 'fixtures', 'expenses_example_wrong.csv'))
      importer = ExpensesImporter.new(file_content: file)
      expect{ importer.import }.to_not change{ Expense.count }
    end
  end
end
