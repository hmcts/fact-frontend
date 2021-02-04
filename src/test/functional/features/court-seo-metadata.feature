Feature: SEO metadata for courts.

  Scenario: Page contains structured data object
    Given an in-person-court details page loads
    Then the page should contain a script element containing structured data
    And it should be parseable into a JSON object
