Feature: View money claims result
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page

  Scenario Outline: Select money claims category
    Then I select an "<options>" of either send documents, get an application update or not listed
    Given I can continue having selected that option
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
    When I select "#money" from the areas of law page and continue
    Then I select "#money-claims" category from the list of categories
    Given I can continue having selected that option
    Then I am presented with the "Search for location - Find a court or tribunal - GOV.UK" page
    And I can select that entry via the hyperlink
    Then I can view the selected court or tribunal details
    Examples:
      | options          |
      | #document-court  |
      | #update-court    |
      | #not-listed      |
