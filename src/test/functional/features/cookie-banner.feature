Feature: Court Name Know - Court Details

  Background:
    Given I am on new browser
    Given I am on FACT homepage
    Then I expect the page header to be "Find a court or tribunal - GOV.UK"

  Scenario: View cookies link
    Then I can view the cookie options within the cookie banner
    When I select that hyperlink in the cookie banner
    Then I am redirected and expect the page header to be "Cookies on GOV.UK"

  Scenario 3 - View and set cookie preferences from page footer
    Then I can view the cookies hyperlink link within the page footer
    When I select that hyperlink
    Then I am redirected and expect the page header to be "Cookies on GOV.UK"
