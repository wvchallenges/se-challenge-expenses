require 'rails_helper'

RSpec.describe Expense, :type => :model do

  include_context 'csv file' 

  before(:each) { Csvfile.create_from_csv csv, name }
  subject { Expense.first }

  describe '.create' do
    its(:expense_description) { should_not be nil }
    its(:date) { should be_kind_of ActiveSupport::TimeWithZone }
    its(:category) { should_not be nil }
    its(:pre_tax_amount) { should be_kind_of Float }
    its(:tax_name) { should_not be nil }
    its(:tax_amount) { should be_kind_of Float }
    its(:csvfile) { should be_kind_of Csvfile }
    its(:employee) { should be_kind_of Employee }
  end

  describe '#total_with_tax' do
    let(:pre_tax_amount) { 100.00 }
    let(:tax_amount) { 15.00 }
    subject { 
      FactoryGirl.create(:expense, pre_tax_amount: pre_tax_amount, tax_amount: tax_amount ) 
    }
    let(:expected_total) { pre_tax_amount + tax_amount }

    its(:total_with_tax) { should eq expected_total }
  end

end
