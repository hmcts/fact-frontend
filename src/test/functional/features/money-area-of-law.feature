Feature: No name option
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page


Scenario Outline Select money area of law category or I can't find what I'm looking for
  Then I can select an "<options>" option from the list displayed
  Given I can continue having selected that option
  Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
  When I select the "money area of law" from the areas of law page
  Then I am presented with the "money areas of law" page
  Given I can select a "<money category>" from the money area of law page
  Then I can continue having selected that option
  Examples:
    | options         |
    | nearest court   |
    | document court  |
    | update court    |
    | not listed      |
  Examples:
    | money category            |
    | money claims              |
    | probate                   |
    | housing                   |
    | bankruptcy                |
    | benefits                  |
    | claims against employers  |
    | tax                       |
    | minor criminal offences   |
    | not listed                |

  Scenario Outline Do not select money area of law category or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select the "money area of law" from the areas of law page
    Then I am presented with the "money areas of law" page
    And I continue having not selected an money area of law option
    Then I am presented with an error message
    Given I can select a "<money category>" from the money area of law page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | money category            |
      | money claims              |
      | probate                   |
      | housing                   |
      | bankruptcy                |
      | benefits                  |
      | claims against employers  |
      | tax                       |
      | minor criminal offences   |
      | not listed                |
