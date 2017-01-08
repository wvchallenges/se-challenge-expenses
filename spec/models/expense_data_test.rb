require 'rails_helper'

describe ExpenseData do
  let(:expense_row) do
    csv_row = ['12/1/2013', 'Travel', 'Don Draper', '783 Park Ave, New York, NY 10021', 'Taxi ride', '350.00', 'NY Sales tax', '31.06']
    ExpenseData.new(csv_row)
  end

  describe '#date' do
    it 'is set correctly' do
      expect(expense_row.date.strftime('%m/%d/%Y')).to eq('12/01/2013')
    end
  end

  describe '#category' do
    it 'is set correctly' do
      expect(expense_row.category).to eq('Travel')
    end
  end

  describe '#employee_name' do
    it 'is set correctly' do
      expect(expense_row.employee_name).to eq('Don Draper')
    end
  end

  describe '#employee_address' do
    it 'is set correctly' do
      expect(expense_row.employee_address).to eq('783 Park Ave, New York, NY 10021')
    end
  end

  describe '#description' do
    it 'is set correctly' do
      expect(expense_row.description).to eq('Taxi ride')
    end
  end

  describe '#pretax_amount' do
    it 'is set correctly' do
      expect(expense_row.pretax_amount).to eq(350.00)
    end
  end

  describe '#tax_name' do
    it 'is set correctly' do
      expect(expense_row.tax_name).to eq('NY Sales tax')
    end
  end

  describe '#tax_amount' do
    it 'is set correctly' do
      expect(expense_row.tax_amount).to eq(31.06)
    end
  end

  describe '#total_amount' do
    it 'is set correctly' do
      expect(expense_row.total_amount).to eq(381.06)
    end
  end
end
