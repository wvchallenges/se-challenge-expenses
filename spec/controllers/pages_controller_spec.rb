describe PagesController do
  describe '#upload_file' do
    let(:file) { fixture_file_upload(fixture_file_path, 'text/csv') }

    subject { post :upload_file, params: { file: file } }

    context 'when valid' do
      let(:fixture_file_path) { 'simple_example.csv' }

      it 'creates 1 upload' do
        expect { subject }.to change(Upload, :count).by(1)
      end

      it 'imports any expenses' do
        expect { subject }.to change(Expense, :count).by(4)
      end
    end

    context 'when invalid' do
      let(:fixture_file_path) { 'invalid_example.csv' }

      it "doesn't create any uploads" do
        expect { subject }.to change(Upload, :count).by(0)
      end

      it "doesn't import any expense" do
        expect { subject }.to change(Expense, :count).by(0)
      end
    end
  end
end
