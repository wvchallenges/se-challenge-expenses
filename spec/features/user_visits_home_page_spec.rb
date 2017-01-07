require 'rails_helper'

feature 'User visits homepage' do
  scenario 'User sees html body' do
    visit root_path

    expect(page).to have_css 'body'
  end
end
