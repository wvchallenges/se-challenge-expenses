require 'spec_helper'

RSpec.describe CSVFile, type: :model do

  def validate_status(attrs, matcher)
    csv_file = build(:csv_file, attrs)

    expect(csv_file).to matcher
  end

  def validate_status_false(matcher)
    csv_file = build(:csv_file)

    expect(csv_file).not_to matcher
  end

  context '#processing?' do
    it 'should return true when processing' do
      validate_status({status: described_class::STATUS_PROCESSING}, be_processing)
    end

    it 'should return false otherwise' do
      validate_status_false(be_processing)
    end
  end

  context '#processed?' do
    it 'should return true when processed' do
      validate_status({status: described_class::STATUS_PROCESSED}, be_processed)
    end

    it 'should return false otherwise' do
      validate_status_false(be_processed)
    end
  end

  context '#failed_processing?' do
    it 'should return true when proccesing has failed' do
      validate_status({status: described_class::STATUS_FAILED_PROCESSING}, be_failed_processing)
    end

    it 'should return false otherwise' do
      validate_status_false(be_failed_processing)
    end
  end


end
