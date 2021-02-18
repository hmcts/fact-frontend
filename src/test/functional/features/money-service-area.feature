Feature: Money area of law
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page

  Scenario Outline: Select money area of law category or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#money" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - money - Find a court or tribunal - GOV.UK" page
    Given I can select a "<money category>" from the money area of law page
    Then I can continue having selected that option
    Examples:
      | options         | money category            |
      | nearest court   | money claims              |
      | document court  | probate                   |
      | update court    | housing                   |
      | not listed      | bankruptcy                |
      |                 | benefits                  |
      |                 | claims against employers  |
      |                 | tax                       |
      |                 | minor criminal offences   |
      |                 | not listed                |

  Scenario Outline: Do not select money area of law category or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#money" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - money - Find a court or tribunal - GOV.UK" page
    And I continue having not selected an money area of law option
    Then I am presented with an error message for service area
    Given I can select a "<money category>" from the money area of law page
    Then I can continue having selected that option
    Examples:
      | options         | money category            |
      | nearest court   | money claims              |
      | document court  | probate                   |
      | update court    | housing                   |
      | not listed      | bankruptcy                |
      |                 | benefits                  |
      |                 | claims against employers  |
      |                 | tax                       |
      |                 | minor criminal offences   |
      |                 | not listed                |
