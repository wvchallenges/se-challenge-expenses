Given(/^I'm on the index page$/) do
  visit root_path
end

When(/^I Click on Browse button$/) do
  page.find("input",:id=>'file').click()
end

When(/^Select a CSV file$/) do
  find("input",:id=>'file').click()
  attach_file('file',File.absolute_path('data_example.csv'))
  page.find_button(:value=>'Import Expenses').click()
  #save_and_open_page
end

Then(/^I should see the message "([^"]*)"$/) do |message|
  page.should have_content(message)
end

