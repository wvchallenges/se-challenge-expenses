require 'csv'

describe ExpenseImportService do
  # rubocop:disable Metrics/AbcSize
  def assert_expense_equal(actual, expected)
    expect(actual.date).to eq(expected.date)
    expect(actual.category_name).to eq(expected.category_name)
    expect(actual.employee_name).to eq(expected.employee_name)
    expect(actual.employee_address).to eq(expected.employee_address)
    expect(actual.description).to eq(expected.description)
    expect(actual.pre_tax_amount).to eq(expected.pre_tax_amount)
    expect(actual.tax_name).to eq(expected.tax_name)
    expect(actual.tax_amount).to eq(expected.tax_amount)
  end
  # rubocop:enable Metrics/AbcSize

  describe '#import' do
    let(:csv_raw) do
      # rubocop:disable LineLength
      "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n" \
      '9/30/2013,Office Supplies,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00'
      # rubocop:enable LineLength
    end
    let(:csv_row) { CSV.parse(csv_raw, headers: true).first }

    it 'creates an expense' do
      service = described_class.new

      expect { service.import csv_row }.to change(Expense, :count).by(1)

      expense = Expense.last
      assert_expense_equal(
        expense,
        OpenStruct.new(
          date: Date.new(2013, 9, 30),
          category_name: 'Office Supplies',
          employee_name: 'Larry Page',
          employee_address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
          description: 'Paper',
          pre_tax_amount: Money.new(200 * 100),
          tax_name: 'CA Sales tax',
          tax_amount: Money.new(15 * 100)
        )
      )
    end
  end

  describe '#import_file' do
    let(:csv_raw) do
      # rubocop:disable LineLength
      "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n" \
      "12/1/2013,Travel,Don Draper,\"783 Park Ave, New York, NY 10021\",Taxi ride, 350.00 ,NY Sales tax, 31.06\n" \
      '9/30/2013,Office Supplies,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00'
      # rubocop:enable LineLength
    end
    let(:csv_file) { CSV.parse(csv_raw, headers: true) }

    it 'creates expenses' do
      service = described_class.new

      expect { service.import_file csv_file }.to change(Expense, :count).by(2)

      expense = Expense.find_by description: 'Taxi ride'
      assert_expense_equal(
        expense,
        OpenStruct.new(
          date: Date.new(2013, 12, 1),
          category_name: 'Travel',
          employee_name: 'Don Draper',
          employee_address: '783 Park Ave, New York, NY 10021',
          description: 'Taxi ride',
          pre_tax_amount: Money.new(350 * 100),
          tax_name: 'NY Sales tax',
          tax_amount: Money.new(31.06 * 100)
        )
      )

      expense = Expense.find_by description: 'Paper'
      assert_expense_equal(
        expense,
        OpenStruct.new(
          date: Date.new(2013, 9, 30),
          category_name: 'Office Supplies',
          employee_name: 'Larry Page',
          employee_address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
          description: 'Paper',
          pre_tax_amount: Money.new(200 * 100),
          tax_name: 'CA Sales tax',
          tax_amount: Money.new(15 * 100)
        )
      )
    end
  end
end
