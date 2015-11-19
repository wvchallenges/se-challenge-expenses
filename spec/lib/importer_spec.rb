require 'rails_helper'
require_relative Rails.root.join('app/lib/importer.rb')

RSpec.describe Importer, type: :model do
  let(:first_row) do
    {
      employee: {
        name: 'Don Draper',
        address: '783 Park Ave, New York, NY 10021'
      },
      tax: {
        name: 'NY Sales tax'
      },
      category: {
        name: 'Travel'
      },
      expense: {
        date: Date.new(2013, 12, 1),
        description: 'Taxi ride',
        pre_tax_amount: 350.00,
        tax_amount: 31.06
      }
    }
  end

  let(:second_row) do
    {
      employee: {
        name: 'Don Draper',
        address: '783 Park Ave, New York, NY 10021'
      },
      tax: {
        name: 'NY Sales tax'
      },
      category: {
        name: 'Travel'
      },
      expense: {
        date: Date.new(2013, 12, 24),
        description: 'Air Transportation',
        pre_tax_amount: 1350.00,
        tax_amount: 300.00
      }
    }
  end

  let(:third_row) do
    {
      employee: {
        name: 'Linda Rows',
        address: '123 Madison Ave, New York, NY 10101'
      },
      tax: {
        name: 'US Federal tax'
      },
      category: {
        name: 'Travel'
      },
      expense: {
        date: Date.new(2013, 1, 2),
        description: 'Flowers',
        pre_tax_amount: 13.00,
        tax_amount: 3.00
      }
    }
  end

  let(:incomplete_row) do
    {
      employee: {
        name: 'Linda Rows',
        address: '123 Madison Ave, New York, NY 10101'
      },
      tax: {
        name: nil
      },
      category: {
        name: 'Travel'
      },
      expense: {
        date: Date.new(2013, 1, 2),
        description: 'Flowers',
        pre_tax_amount: 13.00,
        tax_amount: 3.00
      }
    }
  end

  context 'one row' do
    # Run before each test
    let!(:imported_expenses) { described_class.import!(rows) }

    let(:rows) { [ first_row ] }

    let(:expected_employee) do
      {
        'name' => 'Don Draper',
        'address' => '783 Park Ave, New York, NY 10021'
      }
    end

    let(:expected_tax) do
      {
        'name' => 'NY Sales tax'
      }
    end

    let(:expected_category) do
      {
        'name' => 'Travel'
      }
    end

    let(:expected_expense) do
      {
        'date' => Date.new(2013, 12, 1),
        'description' => 'Taxi ride',
        'pre_tax_amount' => 350.00,
        'tax_amount' => 31.06
      }
    end

    it 'creates employee record' do
      expect(Employee.count).to eq(1)

      expect(Employee.first.attributes).to include(expected_employee)
    end

    it 'creates Tax record' do
      expect(Tax.count).to eq(1)

      expect(Tax.first.attributes).to include(expected_tax)
    end

    it 'creates Category record' do
      expect(Category.count).to eq(1)
      expect(Category.first.attributes).to include(expected_category)
    end

    it 'creates expense record' do
      expect(Expense.count).to eq(1)

      actual = Expense.first
      expect(actual.attributes).to include(expected_expense)
      expect(actual.category).to eq(Category.first)
      expect(actual.tax).to eq(Tax.first)
      expect(actual.employee).to eq(Employee.first)
    end

    it 'returns a list of the recently imported expenses' do
      expect(imported_expenses).to eq(Expense.all)
    end
  end

  context 'two rows' do
    # Run before each test
    let!(:imported_expenses) { described_class.import!(rows) }

    let(:rows) { [ first_row, second_row ] }

    it 'does not create employee record' do
      expect(Employee.count).to eq(1)
    end

    it 'does not create tax record' do
      expect(Tax.count).to eq(1)
    end

    it 'does not create category record' do
      expect(Category.count).to eq(1)
    end

    it 'creates an expense record' do
      expect(Expense.count).to eq(2)
    end
  end

  context 'three rows' do
    # Run before each test
    let!(:imported_expenses) { described_class.import!(rows) }

    let(:rows) { [ first_row, second_row, third_row ] }

    it 'does not create employee record' do
      expect(Employee.count).to eq(2)
    end

    it 'does not create tax record' do
      expect(Tax.count).to eq(2)
    end

    it 'does not create category record' do
      expect(Category.count).to eq(1)
    end

    it 'creates an expense record' do
      expect(Expense.count).to eq(3)
    end
  end

  context 'incomplete row' do
    let(:rows) { [ first_row, second_row, third_row, incomplete_row ] }

    it 'does not create any database records' do
      expect do
        described_class.import!(rows)
      end.to raise_exception ActiveRecord::RecordInvalid
    end

    it 'does not create any database records' do
      begin
        described_class.import!(rows)
      rescue
      end

      expect(Employee.all).to be_empty
      expect(Tax.all).to be_empty
      expect(Category.all).to be_empty
      expect(Expense.all).to be_empty
    end
  end
end
