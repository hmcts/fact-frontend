Feature: Postcode Proximity Feature
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "Find or contact a court - Find a Court or Tribunal - GOV.UK" page

  Scenario Outline: Enter postcode - valid format
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  @test
  Scenario Outline: User does not know area of law and searches by postcode - valid format
    Then I can select an "#<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Then I expect the page header to be "Page not found - Find a Court or Tribunal - GOV.UK"
    And I select
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered a postcode "#<postcode>"
    Then I can continue my user journey

    Examples:
      | options        | postcode | area_of_law |
      | document court  |  E8 1DY | not-listed  |

  Scenario Outline: Enter postcode - invalid format
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "TWA 1UH"
    Then I am presented with an postcode error "Enter a valid postcode format"
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  Scenario Outline: No postcode entered
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode ""
    Then I am presented with an postcode error "Enter a postcode"
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  Scenario Outline: Enter Scottish Postcode
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "AB10 1WP"
    Then I am presented with an postcode error "We do not have court information for this service. Contact the Scottish Courts and Tribunals for help."
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  Scenario Outline: Enter Scottish Postcode - children area of law
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "AB10 1WP"
    Then I am presented with an postcode error "If the child (or children) resides in Scotland they will be outside the jurisdiction for this service. Contact the Scottish Courts and Tribunals for help."
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category   |
      | nearest court  | childcare-and-parenting | childcare-arrangements |

  Scenario Outline: Enter Northern Ireland Postcode
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "BT1 3LL"
    Then I am presented with an postcode error "We do not have court information for Northern Ireland. Contact the Northern Ireland Courts and Tribunals for help."
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  Scenario Outline: Enter Channel Islands Postcode
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "JE2 3QQ"
    Then I am presented with an postcode error "Enter a valid postcode format"
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  Scenario Outline: Enter Isle of Man Postcode
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a Court or Tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "IM1 3AR"
    Then I am presented with an postcode error "Enter a valid postcode format"
    When I continue having entered a postcode "E8 1DY"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |
