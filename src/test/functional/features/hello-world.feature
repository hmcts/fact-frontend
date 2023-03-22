Feature: Initial Functional test

  Scenario: The home page loads
    When I am on FACT homepage '/'
    Then the page should include 'Find a Court or Tribunal'
    Then I expect the page header to be "Find a Court or Tribunal - GOV.UK"
