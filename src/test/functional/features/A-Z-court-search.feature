Feature: A to Z Court Search
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page
    Then I select It is not listed here
    Then I am presented with the "Why do you need a court? - Find a Court or Tribunal - GOV.UK" page
    When I select I can not find what I am looking for
    Then I am presented with the "Service not found - Find a Court or Tribunal - GOV.UK" page
    When I click on the link Search for a court by prefix (A - Z)
    Then I am presented with the "Search By Prefix - Find a Court or Tribunal - GOV.UK" page

  Scenario: Letter with no court found
    When I click on the letter "X"
    Then I am presented with message that no court found
    And  I am presented with an empty results list

  Scenario: Court Page Validation
    When I click on the letter "B"
    Then I can see courts list all start with "B"
    And  I click on the first court in the results list
    Then I am presented with the "Bankruptcy Court (High Court) - Find a Court or Tribunal - GOV.UK" page
