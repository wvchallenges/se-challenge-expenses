require 'spec_helper'

describe Expense do

  it 'should calculate correct expenses for 1 month' do
    Expense.create(purchase_date: Date.new(2012, 12, 20), pre_tax_amount: 100, tax_amount: 10)
    expect(Expense.month_expenses.rows.first).to eq([100, 10, "2012", "12"])
  end

  it 'should calculate correct expenses for 1 month with two expenses' do
    Expense.create(purchase_date: Date.new(2012, 12, 20), pre_tax_amount: 100, tax_amount: 10)
    Expense.create(purchase_date: Date.new(2012, 12, 15), pre_tax_amount: 100, tax_amount: 10)
    expenses = Expense.month_expenses
    expect(expenses.rows.first).to eq([200, 20, "2012", "12"])
    expect(expenses.rows.count).to eq(1)
  end

  it 'should calculate two months correctly' do
    Expense.create(purchase_date: Date.new(2012, 10, 20), pre_tax_amount: 100, tax_amount: 10)
    Expense.create(purchase_date: Date.new(2012, 12, 15), pre_tax_amount: 50, tax_amount: 5)
    expenses = Expense.month_expenses
    expect(expenses.rows.first).to eq([100, 10, "2012", "10"])
    expect(expenses.rows.last).to eq([50, 5, "2012", "12"])
    expect(expenses.rows.count).to eq(2)
  end

end
