require 'rails_helper'

describe Business::Report do
  describe 'associations' do
    it { expect(subject).to belong_to(:business).class_name("Business::Business").with_foreign_key(:business_id) }
    it { expect(subject).to have_many(:entries).class_name("Business::ReportEntry").with_foreign_key(:business_report_id) }
  end
end