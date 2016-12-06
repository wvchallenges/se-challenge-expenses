require "rails_helper"

describe ExpenseGroup do
  describe "#total" do
    let(:expense1) { Expense.new(pre_tax_amount: 10, tax_amount: 2) }
    let(:expense2) { Expense.new(pre_tax_amount: 5, tax_amount: 1) }

    subject { ExpenseGroup.new(nil, [expense1, expense2]) }

    it { expect(subject.total).to eq(18) }
  end
end
