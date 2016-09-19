require 'rails_helper'

RSpec.describe Import, type: :model do

  it { is_expected.to have_and_belong_to_many(:expenses) }
  it { is_expected.to have_many(:monthly_expenses) }
  it { is_expected.to validate_presence_of(:uploaded_file).with_message "must be selected" }

  describe "FileUploadConcern" do
    it "should include the module" do
      expect(Import.ancestors).to include(FileUploadConcern)
    end
  end

  it { is_expected.to callback(:process_uploaded_file).after(:commit).on(:create) }
end
