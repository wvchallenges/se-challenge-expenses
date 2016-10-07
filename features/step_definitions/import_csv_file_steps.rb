Given(/^I'm on the index page$/) do
  visit root_path
end

When(/^I Click on "([^"]*)" button$/) do |button_name|
  page.find_button(:value=>button_name).click()
end

When(/^Select a CSV file$/) do
  WebElement El = driver.findElement(By.id("'fileUploadField'"));
  El.sendKeys("data_example.csv");
end

Then(/^I should see the message "([^"]*)"$/) do |message|
  page.should have_content(message)
end

