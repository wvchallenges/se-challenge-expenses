require 'rails_helper'

RSpec.describe ImportersController, type: :controller do
  describe 'GET #index' do
    it 'returns http success' do
      get :index

      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    let(:query_parameters) do
      {
        file: fixture_file_upload('sample.csv')
      }
    end

    before :each do
      post :create, query_parameters
    end

    it 'has three seven employees' do
      expect(Employee.count).to eq(7)
    end

    it 'has two new taxes' do
      expect(Tax.count).to eq(2)
    end

    it 'has five new categories' do
      expect(Category.count).to eq(5)
    end

    it 'has 19 new expenses' do
      expect(Expense.count).to eq(19)
    end

    it 'parsed 19 new expenses' do
      expect(assigns(:expenses).count).to eq(19)
    end

    context 'No file was uploaded' do
      let(:query_parameters) do
        {
          file: nil
        }
      end

      it 'redirects to #index' do
        expect(response).to redirect_to(action: :index)
      end
    end
  end
end
