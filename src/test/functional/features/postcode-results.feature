Feature: Postcode Results Feature

  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Postcode search criteria that returns search results
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a court or tribunal - GOV.UK" page
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey
    And the results are displayed with distance
    And any listed court entry can be selected via a hyperlink

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | tax                  |


  Scenario Outline: Postcode search criteria that returns no search results - no service area match
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a court or tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "TWA 1UH"
    Then I am presented with an postcode error message
    When I continue having entered a postcode "EH1 9SP"
    Then I can continue my user journey
    Then I am presented with a no matching results display
    And I can re-enter the postcode
    And I can select to search for that content

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | childcare-and-parenting | adoption             |
