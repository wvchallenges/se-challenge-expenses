require 'rails_helper'

RSpec.describe Csvfile, :type => :model do

  include_context 'csv file' 

  subject { Csvfile.create_from_csv csv, name }

  let(:total_expenses_in_file) { 19 }

  describe '.create' do
    its(:name) { should eq name }  
  end

  describe '.create_from_csv' do 

    context 'when it receives the example CSV file' do 
      it { should_not be nil } 
      its('expenses.count') { should eql total_expenses_in_file }
    end 

  end

  describe '#decode_expense' do

    before(:each) { subject } # trigger the import

    let(:total_unique_addresses_in_file) { 3 }
    let(:total_unique_employees_in_file) { 7 }

    context 'when it receives the example CSV file' do 
      it 'should create a total of 19 expenses' do
        Expense.all.size.should == total_expenses_in_file
      end

      it 'should create 3 unique addresses only' do 
        Address.all.size.should == total_unique_addresses_in_file
      end

      it 'should create 7 unique employees only' do 
        Employee.all.size.should == total_unique_employees_in_file
      end
    end
    
  end

end
