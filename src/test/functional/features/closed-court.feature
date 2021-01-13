Feature: Closed court

  Scenario: Load closed court
    Given I am on closed-court page
    Then I expect the closed-court page header to be "Find a court or tribunal - GOV.UK"
    When I can select the link
    Then I expect the closed-court page header to be "Find a court or tribunal - GOV.UK"

