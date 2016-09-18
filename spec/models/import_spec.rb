require 'rails_helper'

RSpec.describe Import, type: :model do

  it { is_expected.not_to be_valid }
  context "uploaded_file is not blank" do
    subject { Import.new uploaded_file: "foobar" }
    it { is_expected.to be_valid }
  end

  describe "FileUploadConcern" do
    it "should include the module" do
      expect(Import.ancestors).to include(FileUploadConcern)
    end
  end

end
