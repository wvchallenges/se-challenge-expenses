feature 'Homepage' do
  scenario 'see Hello' do
    visit '/'
    expect(page).to have_content('Hello')
  end
end
