require 'spec_helper'

RSpec.describe ExpenseEntry, type: :model do
  let(:expense_entry) { create(:expense_entry, pre_tax_amount: 10, tax_amount: 1) }
  context '#total_expense' do
    subject { expense_entry.total_expense }

    it 'gets the total expense on the entry (including tax)' do
      expect(subject).to eq(11)
    end
  end
end
