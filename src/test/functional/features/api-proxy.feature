Feature: API Proxy

  Scenario: Make a legacy API call
    Given I am an API client
    When I make an API call to "/courts/cardiff-social-security-and-child-support-tribunal.json"
    Then I expect some JSON to be returned

  Scenario: Proxy request to Fact API to get courts for service area request
    Given I am an API client
    When I make an API call to "/v2/proxy/search/postcode/bd96sg/serviceArea/divorce"
    Then I expect some header to be returned
    Then I expect response data contains slug "divorce"
    When I make an API call to "/v2/proxy/search/slug/cardiff-social-security-and-child-support-tribunal"
    Then I expect some header to be returned
    Then I expect response data contains slug "cardiff-social-security-and-child-support-tribunal"
