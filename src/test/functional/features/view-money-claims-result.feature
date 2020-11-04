Feature: View money claims result
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Select money claims category
    Then I select an "<options>" of either send documents, get an application update or not listed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#money" from the areas of law page and continue
    Then I select "#money-claims" category from the list of categories
    Given I can continue having selected that option
    Then I am presented with a single search results entry
    And I can select that entry via the hyperlink
    Then I am presented with the "Individual court or tribunal page - Find a court or tribunal - GOV.UK" page
  Examples:
    | options         |
    | document court  |
    | update court    |
    | not listed      |
