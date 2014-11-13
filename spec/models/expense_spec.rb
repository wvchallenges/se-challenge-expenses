require 'rails_helper'

RSpec.describe Expense, :type => :model do
  before do
    @expense = Expense.create(expense_description: "Laundry")
  end

  subject { @expense }

  it { should respond_to(:date) }
  it { should respond_to(:category) }
  it { should respond_to(:employee_name) }
  it { should respond_to(:employee_address) }
  it { should respond_to(:expense_description) }
  it { should respond_to(:tax_name) }
  it { should respond_to(:pre_tax_amount) }

  it { should be_valid }
end
