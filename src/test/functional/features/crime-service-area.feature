Feature: Crime area of law
  Background:
    Given I am on FACT homepage '/'
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page

#  Scenario Outline: Select crime area of law or I can't find what I'm looking for
#    Then I can select an "<options>" option from the list displayed
#    Given I can continue having selected that option
#    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
#    When I select "#crime" from the areas of law page and continue
#    Then I am presented with the "Crime cases - Find a Court or Tribunal - GOV.UK" page
#    Given I can select a "<crime category>" from the crime service area page
#    Then I can continue having selected that option
#    Examples:
#      | options         | crime category          |
#      | nearest court   | minor                   |
#      | document court  | major                   |
#      | update court    | not listed              |
#      | not listed      |                         |

#  Scenario Outline: Do not select crime area of law or I can't find what I'm looking for
#    Then I can select an "<options>" option from the list displayed
#    Given I can continue having selected that option
#    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
#    When I select "#crime" from the areas of law page and continue
#    Then I am presented with the "Crime cases - Find a Court or Tribunal - GOV.UK" page
#    And I continue having not selected a crime service area option
#    Then I am presented with an error message for service area
#    Given I can select a "<crime category>" from the crime service area page
#    Then I can continue having selected that option
#    Examples:
#      | options         | crime category          |
#      | nearest court   | minor                   |
#      | document court  | major                   |
#      | update court    | not listed              |
#      | not listed      |                         |
