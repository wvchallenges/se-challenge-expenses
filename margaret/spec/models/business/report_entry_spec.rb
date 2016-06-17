require 'rails_helper'

describe Business::ReportEntry do
  describe 'associations' do
    it { expect(subject).to belong_to(:report).class_name("Business::Report").with_foreign_key(:business_report_id) }
    it { expect(subject).to belong_to(:business).class_name("Business::Business").with_foreign_key(:business_id) }
  end
end