Feature: GA dataLayer

  Scenario: Error message
    Given A page renders an error
    Then There is an error message object in the dataLayer
