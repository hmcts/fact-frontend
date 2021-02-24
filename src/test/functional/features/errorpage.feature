Feature: Error page

  Scenario: Load error page
    Given I am on FACT error page
    Then I expect the page header to be "Service problem - Find a Court or Tribunal - GOV.UK"
