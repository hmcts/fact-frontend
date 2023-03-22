Feature: SEO metadata for courts.

  Scenario Outline: A court or service center page contains a rich structured data object for SEO purposes.
    Given a "<court_type>" page with the court slug "<court_slug>" loads
    Then the page should contain a script element containing structured data
    And it should be parseable into a JSON object

    Examples:
      | court_type          | court_slug                                  |
      | in-person-court     | birmingham-civil-and-family-justice-centre  |
      | not-in-person-court | probate-service-centre                      |
