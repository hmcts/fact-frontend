Feature: SEO metadata for courts.

  Scenario: SEO metadata tag postcode search page
    Given the postcode search page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag search option page
    Given the search option page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag choose action page
    Given the choose action page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag search by name page
    Given the search by name page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag choose service page
    Given the choose service page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag service results page
    Given the service results page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag postcode search results page
    Given the postcode search results page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag service not found page
    Given the service not found page loads
    Then it contains a metadata description tag
