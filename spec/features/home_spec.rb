feature 'Homepage' do
  def upload_file_on_homepage
    visit '/'
    attach_file('file', fixture_file_path)
    click_on 'Upload'
  end

  context 'when file is valid' do
    let(:fixture_file_path) { Rails.root.join('spec/fixtures/simple_example.csv') }

    scenario 'can upload a file' do
      upload_file_on_homepage

      within '[data-test="2013-12"]' do
        expect(page).to have_content('585.00')
      end
    end
  end

  context 'when file is invalid' do
    let(:fixture_file_path) { Rails.root.join('spec/fixtures/invalid_example.csv') }

    scenario 'user sees a friendly error message' do
      upload_file_on_homepage

      expect(page).to have_content('Failed to process line #3')
    end
  end
end
