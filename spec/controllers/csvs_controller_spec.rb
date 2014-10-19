require 'rails_helper'

RSpec.describe CsvsController, :type => :controller do

  let(:expected_id) { 1 }

  describe "#create" do
    before :each do
      @file = fixture_file_upload('files/data_example.csv', 'text/csv')
      post :create, :file => @file
    end
    it "returns a JSON object with an id when successfully importing" do
      JSON.parse(response.body)["id"].should eql expected_id
    end
  end

end
