Feature: GA dataLayer

  Scenario: Page language
    Given I am on FACT homepage '/'
    Then There is language object in the dataLayer
    When I switch language
#    Then The language object contains "cy"
#    When I switch language
#    Then The language object contains "en"
#
#  Scenario: Error message
#    Given A page renders an error
#    Then There is an error message object in the dataLayer
