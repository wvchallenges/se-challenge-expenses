require "rails_helper"

describe Expense do
  describe "#total" do
    let(:pre_tax_amount) { 5 }
    let(:tax_amount) { 2 }

    subject { Expense.new(pre_tax_amount: pre_tax_amount, tax_amount: tax_amount) }

    it { expect(subject.total).to eq(7) }
  end
end
