Feature: Search

  Scenario Outline: Court Name Known
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I have the name"
    Then I can select the option to search for "<search_results>"

    Examples:
      | search_results |
      | London Road    |
