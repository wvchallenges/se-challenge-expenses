require 'rails_helper'

RSpec.describe Employee, :type => :model do
 
  include_context 'csv file' 

  before(:each) { Csvfile.create_from_csv csv, name }
  subject { Employee.first }

  describe '.create' do
    its(:name) { should_not be nil }
  end

end
