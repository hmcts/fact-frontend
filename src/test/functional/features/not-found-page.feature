Feature: Not found page

  Scenario: Load not found  page
    Given I am on FACT not found page
    Then I expect the page header to be "Page not found - Find a Court or Tribunal - GOV.UK"
