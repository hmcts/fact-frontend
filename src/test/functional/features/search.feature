Feature: Search
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I have the name"

  Scenario Outline: Court Name Known
    Then I can select the option to search for "<search_content>"

    Examples:
      | search_content |
      | London Road    |

  Scenario Outline: Partial search criteria that returns search result
    And I have entered "<partial_search_content>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Then all courts and tribunals are listed in sorting rules order where the entered content is within any name or address field where partial search content is sufficient
    And any listed entry can be selected via a hyperlink

    Examples:
      | partial_search_content |
      | Oxf                 |

  Scenario Outline: Full search criteria that returns search result
    And I have entered "<full_search_content>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Then all courts and tribunals are listed in sorting rules order where the entered content is within any name or address field where full search content is required
    And any listed entry can be selected via a hyperlink

    Examples:
      | full_search_content |
      | Plymouth            |

  Scenario Outline: Full postcode search criteria that returns search result
    And I have entered "<full_search_content>" as search criteria
    When I have selected to search for that content
    Then all courts and tribunals within that full postcode location are listed
    And those entries are listed in sorting rules order
    And any listed entry can be selected via a hyperlink

    Examples:
      | full_search_content |
      | B4 6DS              |

  Scenario Outline: Partial postcode search criteria that returns search result
    And I have entered "<partial_search_content>" as search criteria
    When I have selected to search for that content
    Then all courts and tribunals within that partial postcode location are listed
    And those entries are listed in sorting rules order
    And any listed entry can be selected via a hyperlink

    Examples:
      | partial_search_content |
      | B4 6                   |


  Scenario Outline: Search when no criteria entered
    And I have not entered search content
    When I have selected to search for that content
    Then I am presented with an error
    And there are no matching results
    And I am presented with a no matching results display
    And I can enter "<search_content>"
    And I can select to search for that content

    Examples:
      | search_content |
      | London Road    |

  Scenario Outline: Search when no criteria entered
    And I have entered "lo" as search criteria
    When I have selected to search for that content
    Then I am presented with an error
    And there are no matching results
    And I am presented with a no matching results display
    And I can enter "<search_content>"
    And I can select to search for that content

    Examples:
      | search_content |
      | London Road    |
