require 'rails_helper'

RSpec.describe CsvsController, :type => :controller do

  let(:expected_id) { 1 }

  let(:file) { fixture_file_upload('files/data_example.csv', 'text/csv') }
  before(:each) { post :create, file: file }

  describe '#create' do

    it 'returns a JSON object with an id when successfully importing' do
      JSON.parse(response.body)['id'].should eql expected_id
    end

  end

  describe '#show' do

    before(:each) { get :show, id:  1 }

    it 'returns a JSON array' do
      JSON.parse(response.body).should be_kind_of Hash
      response.body.should_not be nil
    end

  end

end
