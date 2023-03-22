Feature: Homepage

  Scenario: Load Homepage
    When I am on FACT homepage '/'
    Then I expect the page header to be "Find a Court or Tribunal - GOV.UK"
