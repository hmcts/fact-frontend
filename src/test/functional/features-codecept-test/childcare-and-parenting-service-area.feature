Feature: Family and children area of law
  Background:
    Given I am on FACT homepage '/'
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page

  Scenario Outline: Select family and children area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
    When I select "#childcare-and-parenting" from the areas of law page and continue
    Then I am presented with the "Childcare and parenting cases - Find a Court or Tribunal - GOV.UK" page
    Given I can select a "<family and children category>" from the family and children area of law page
    Then I can continue having selected that option
    Examples:
      | options         | family and children category   |
      | nearest court   | childcare                      |
      | document court  | adoption                       |
      | update court    | not listed                     |
      | not listed      |                                |

  Scenario Outline: Do not select family and children area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
    When I select "#childcare-and-parenting" from the areas of law page and continue
    Then I am presented with the "Childcare and parenting cases - Find a Court or Tribunal - GOV.UK" page
    And I continue having not selected a family and children area of law option
    Then I am presented with an error message for service area
    Given I can select a "<family and children category>" from the family and children area of law page
    Then I can continue having selected that option
    Examples:
      | options         | family and children category   |
      | nearest court   | childcare                      |
      | document court  | adoption                       |
      | update court    | not listed                     |
      | not listed      |                                |
