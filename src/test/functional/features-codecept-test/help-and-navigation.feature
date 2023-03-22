Feature: Help and navigation
  Background:
    Given I am on FACT homepage '/'

  Scenario: Beta phase banner
    Then I can view the phase banner at the top of that page
    When I can select the feedback link

  Scenario Outline: Back path
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
    When I select "#immigration-and-asylum" from the areas of law page and continue
    And I select the back button
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
    When I select the back button
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |

  Scenario: Content information banner
    Then I can view the content information banner
    When I can select a hyperlink in the content banner

  Scenario: validating the option of finding nearest courts by postcode
    And I navigate to the Search Page
    When I select "search by postcode"
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
