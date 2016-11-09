feature 'Homepage' do
  let(:fixture_file_path) { Rails.root.join('spec/fixtures/simple_example.csv') }

  scenario 'can upload a file' do
    visit '/'

    attach_file('file', fixture_file_path)
    click_on 'Upload'

    within '[data-test=test-month-201312]' do
      expect(page).to have_content('585.00')
    end
  end
end
