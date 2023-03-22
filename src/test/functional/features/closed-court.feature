Feature: Closed court

  Scenario: Load closed court
    When I am on FACT closed-court page
    Then I expect the page header to be "Aberdare County Court - Find a Court or Tribunal - GOV.UK"
    When I can select the link
    Then I expect the page header to be "Find a Court or Tribunal - GOV.UK"

