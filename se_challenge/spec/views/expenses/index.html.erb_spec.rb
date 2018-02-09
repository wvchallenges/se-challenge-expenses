require 'rails_helper'

RSpec.describe "expenses/index", type: :view do
  before(:each) do
    assign(:expenses, [
      Expense.create!(
        :category => "Category",
        :employee_name => "Employee Name",
        :employee_address => "Employee Address",
        :expense_description => "Expense Description",
        :pre_tax_amount => 2.5,
        :tax_name => "Tax Name",
        :tax_amount => "Tax Amount"
      ),
      Expense.create!(
        :category => "Category",
        :employee_name => "Employee Name",
        :employee_address => "Employee Address",
        :expense_description => "Expense Description",
        :pre_tax_amount => 2.5,
        :tax_name => "Tax Name",
        :tax_amount => "Tax Amount"
      )
    ])
  end

  it "renders a list of expenses" do
    render
    assert_select "tr>td", :text => "Category".to_s, :count => 2
    assert_select "tr>td", :text => "Employee Name".to_s, :count => 2
    assert_select "tr>td", :text => "Employee Address".to_s, :count => 2
    assert_select "tr>td", :text => "Expense Description".to_s, :count => 2
    assert_select "tr>td", :text => 2.5.to_s, :count => 2
    assert_select "tr>td", :text => "Tax Name".to_s, :count => 2
    assert_select "tr>td", :text => "Tax Amount".to_s, :count => 2
  end
end
