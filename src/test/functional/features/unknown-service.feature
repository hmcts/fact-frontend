Feature: Unknown Service

  Scenario: Load Unknown Service
    Given I am on service-not-found page
    Then I expect the service-not-found page header to be "Unknown service - Find a court or tribunal - GOV.UK"
