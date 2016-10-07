Feature: Import CSV File

  @javascript
  Scenario: Uploading a file
    Given I'm on the index page
    When I Click on "Upload File" button
    And Select a CSV file
    Then I should see the message "CSV Uploaded Successfully"