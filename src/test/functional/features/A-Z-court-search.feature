Feature: A to Z Court Search
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page
    Then I select It is not listed here
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page

  Scenario: Courts list display according to the alphabet selected
    Given I selected I can not find what I am looking for
    Then I am presented with the "Service not found - Find a Court or Tribunal - GOV.UK" page
    When I Click on the link Search for a court by prefix (a-z)
    Then I am presented with the "Search By Prefix - Find a Court or Tribunal - GOV.UK" page
    When I clicked on alphabet Y
    Then I can see courts list all start with "Y"

  Scenario: Letter with no court found
    Given I selected I can not find what I am looking for
    Then I am presented with the "Service not found - Find a Court or Tribunal - GOV.UK" page
    When I Click on the link Search for a court by prefix (a-z)
    Then I click on the letter with no courts eg X
    Then I am presented with message that no court found

  Scenario: court page validation
    Given I selected I can not find what I am looking for
    Then I am presented with the "Service not found - Find a Court or Tribunal - GOV.UK" page
    When I Click on the link Search for a court by prefix (a-z)
    Then I am presented with the "Search By Prefix - Find a Court or Tribunal - GOV.UK" page
    When I clicked on alphabet B then I click on first court in the list
    Then I am presented with the "Bankruptcy Court (High Court) - Find a Court or Tribunal - GOV.UK" page
