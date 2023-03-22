Feature: Postcode Results Feature

  Background:
    Given I am on FACT homepage '/'
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page

  Scenario Outline: Postcode search criteria that returns search results
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
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
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered a postcode "bn99 1ab"
    Then I can continue my user journey
    Then I am presented with a no matching results display
    And I can re-enter the postcode
    And I can select to search for that content

    Examples:
      | options        | area_of_law | area_of_law_category    |
      | nearest court  | money       | tax |

  Scenario Outline: User does not know area of law and searches by postcode and gets list of courts back
    Given I can select an "<options>" option from the list displayed
    Then I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Then I expect the page header to be "Service not found - Find a Court or Tribunal - GOV.UK"
    When I select the option to search by postcode via the hyperlink
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    And I continue having entered a postcode "<postcode>"
    And I can continue my user journey
    Then I am presented with the "Court search results - Find a Court or Tribunal - GOV.UK" page
    And the results are displayed with distance
    And any listed court entry can be selected via a hyperlink

    Examples:
      | options         | postcode | area_of_law |
      | nearest court  |  E8 1DY  | not-listed  |
      | document court  |  E8 1DY  | not-listed  |
      | update court  |  E8 1DY  | not-listed  |
      | a default option  |  E8 1DY  | not-listed  |

  Scenario: nearest court search should return 10 nearest courts
    Then I can select an "nearest court" option from the list displayed
    Given I can continue having selected that option
    When I select "#money" from the areas of law page and continue
    Given I can select a "#money-claims" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered a postcode "RM19 1SR"
    Then I can continue my user journey
    Then I can see 10 nearest court result back

  Scenario: court or tribunal search for sending documents should return 1 nearest court
    Then I can select an "document court" option from the list displayed
    Given I can continue having selected that option
    When I select "#money" from the areas of law page and continue
    Given I can select a "#money-claims" from the category area of law page and continue
    Then I can see 1 nearest court result is back

  Scenario: court or tribunal search for getting application update should return 1 nearest court
    Then I can select an "update court" option from the list displayed
    Given I can continue having selected that option
    When I select "#money" from the areas of law page and continue
    Given I can select a "#money-claims" from the category area of law page and continue
    Then I can see 1 nearest court result is back
