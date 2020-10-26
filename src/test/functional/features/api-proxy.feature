Feature: API Proxy

  Scenario: Make a legacy API call
    Given I am an API client
    When I make an API call to "/courts/cardiff-social-security-and-child-support-tribunal.json"
    Then I expect some JSON to be returned
