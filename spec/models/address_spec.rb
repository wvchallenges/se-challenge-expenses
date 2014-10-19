require 'rails_helper'

RSpec.describe Address, :type => :model do

  include_context 'csv file' 

  before(:each) { Csvfile.create_from_csv csv, name }
  subject { Address.first }

  describe '.create' do
    its(:address_line) { should_not be nil }
  end

end
