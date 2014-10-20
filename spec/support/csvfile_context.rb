shared_context 'csv file' do
  let(:name) { 'name' }
  let(:csv) { CSV.read("#{Rails.root}/spec/fixtures/files/data_example.csv") }
end
