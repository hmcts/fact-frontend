Feature: Service not found

  Scenario: Load Service not found
    Given I am on service-not-found page
    Then I expect the service-not-found page header to be "Service not found - Find a court or tribunal - GOV.UK"
