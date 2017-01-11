require 'rails_helper'

feature 'User uploads expenses file' do
  scenario 'Successfully and is redirected to expenses summary' do
    visit new_expense_path

    attach_file('expenses_file', Rails.root.join('spec', 'fixtures', 'expenses_example.csv'))
    click_button 'Upload'

    expect(page).to have_content('Expenses Summary')
    expect(page).to have_css('.expense-row', count: 6)
  end

  scenario 'Invalid and is redirected back to upload page with error message' do
    visit new_expense_path

    attach_file('expenses_file', Rails.root.join('spec', 'fixtures', 'expenses_example_wrong.csv'))
    click_button 'Upload'

    expect(page).to_not have_content('Expenses Summary')
    expect(page).to have_content('We encountered a problem')
  end
end
