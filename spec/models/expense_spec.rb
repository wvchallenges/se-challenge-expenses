require 'spec_helper'
require 'csv'

describe Expense do
  describe 'import csv file' do
    it 'should take a csv file and turn it into appropriate database entries' do
      test_file = File.read('data_example.csv')
      Expense.import(test_file)
      expect(Expense.find_by_id(1).employee_name).to eq("Don Draper")
    end

  end
end