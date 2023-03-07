Feature: API Proxy

  Scenario: Make a legacy API call
    Given I am an API client
    When I make an API call to "/courts/cardiff-social-security-and-child-support-tribunal.json" and expect some JSON to be returned

  Scenario Outline: Proxy request to Fact API to get courts for service area request
    Given I am an API client
    When I make an API call to "<path>" and expect some header and slug "<slug>" to be returned
    Examples:
      | path                                                                     | slug                                               |
      | /v2/proxy/search/postcode/bd96sg/serviceArea/divorce                     | divorce                                            |
      | /v2/proxy/search/slug/cardiff-social-security-and-child-support-tribunal | cardiff-social-security-and-child-support-tribunal |
