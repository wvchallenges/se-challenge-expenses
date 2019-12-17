require 'rails_helper'

describe Business::Business do
  describe 'associations' do
    it { expect(subject).to have_many(:reports).class_name("Business::Report").with_foreign_key(:business_id) }
    it { expect(subject).to have_many(:report_entries).class_name("Business::ReportEntry").with_foreign_key(:business_id) }
  end

  describe 'validations' do
    it { expect(subject).to validate_presence_of(:name) }
    it { expect(subject).to validate_presence_of(:address) }
  end
end