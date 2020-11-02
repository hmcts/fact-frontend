Feature: Harm and abuse area of law
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Select harm and abuse area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#harm-and-abuse" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - harm and abuse - Find a court or tribunal - GOV.UK" page
    Given I can select a "<harm and abuse category>" from the harm and abuse service area page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | harm and abuse category   |
      | domestic abuse            |
      | female genital mutilation |
      | forced marriage           |
      | not listed                |

  Scenario Outline: Do not select harm and abuse area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#harm-and-abuse" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - harm and abuse - Find a court or tribunal - GOV.UK" page
    And I continue having not selected a harm and abuse service area option
    Then I am presented with an error message for service area
    Given I can select a "<harm and abuse category>" from the crime service area page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | harm and abuse category   |
      | domestic abuse            |
      | female genital mutilation |
      | forced marriage           |
      | not listed                |