Feature: User can get monthly expenses summary

As an expense manager
So that I can track our monthly expenses
I want to upload a csv file with all our expenses and produce monthly summaries


Background:
Given I am on the home page
And I should see "Upload a CSV file"
And I upload a valid CSV file

Scenario: Happy path
Then I should be on the monthly expenses page
And I should see "CSV Uploaded Successfully"
And I should see "December"
And I should see "10"
And I should not see "February"
And I should not see "88"

Scenario: Sad path
Then I should be on the home page
And I should see "CSV Upload Error"
And I should not see "December"
