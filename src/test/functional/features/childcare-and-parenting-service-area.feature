Feature: Family and children area of law
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Select family and children area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#childcare-and-parenting" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - childcare and parenting - Find a court or tribunal - GOV.UK" page
    Given I can select a "<family and children category>" from the family and children area of law page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | family and children category   |
      | childcare                      |
      | adoption                       |
      | not listed                     |


  Scenario Outline: Do not select family and children area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#childcare-and-parenting" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - childcare and parenting - Find a court or tribunal - GOV.UK" page
    And I continue having not selected a family and children area of law option
    Then I am presented with an error message for service area
    Given I can select a "<family and children category>" from the family and children area of law page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | family and children category   |
      | childcare                      |
      | adoption                       |
      | not listed                     |
