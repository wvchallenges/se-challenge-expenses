require 'csv'

describe ExpenseImportService do
  let(:service) { described_class.new upload }
  let(:upload) { FactoryGirl.create :upload }

  describe 'importing file' do
    let(:file) do
      file = Tempfile.new
      file.write csv_raw
      file.close
      file
    end
    let(:file_path) { file.path }

    subject { service.import_file file_path }

    context 'when valid data' do
      let(:csv_raw) do
        # rubocop:disable LineLength
        "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n" \
        "12/1/2013,Travel,Don Draper,\"783 Park Ave, New York, NY 10021\",Taxi ride, 350.00 ,NY Sales tax, 31.06\n" \
        '9/30/2013,Office Supplies,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00'
        # rubocop:enable LineLength
      end

      it 'creates expenses' do
        expect { subject }.to change(Expense, :count).by(2)
      end

      it 'creates 1 upload' do
        expect { subject }.to change(Upload, :count).by(1)
      end

      it 'creates expenses with correct info' do
        expenses = subject

        expense = expenses[0]
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

        expense = expenses[1]
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

    context 'when error' do
      let(:csv_raw) do
        # rubocop:disable LineLength
        "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n" \
        "12/1/2013,Travel,Don Draper,\"783 Park Ave, New York, NY 10021\",Taxi ride, 350.00 ,NY Sales tax, 31.06\n" \
        '9/30/2013,,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00'
        # rubocop:enable LineLength
      end

      subject(:suppressed_error_subject) do
        begin
          service.import_file file_path
        rescue ExpenseImportService::ImportError
        end
      end

      it "doesn't import any expense" do
        expect { suppressed_error_subject }.to change(Expense, :count).by(0)
      end

      it 'raise ImportError' do
        # rubocop:disable LineLength
        message = "Failed to process line #2 (where line #0 is the header):\n" \
                  "9/30/2013,,Larry Page,\"1600 Amphitheatre Parkway, Mountain View, CA 94043\",Paper, 200.00 ,CA Sales tax, 15.00\n" \
                  'None of the expenses have been uploaded. ' \
                  'Please fix that line and try again.'
        # rubocop:enable LineLength
        expect { service.import_file file_path }.to raise_error(ExpenseImportService::ImportError,
                                                                message)
      end
    end
  end

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
end
