Feature: Court Name Know - Court Details

  Background:
   Given I am on FACT homepage '/'
   And I navigate to the Search Page
   When I select "I have the name"

  Scenario Outline: In-person court or tribunal selection
    And I have entered "<in_person_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And  that location is an 'in-person' court or tribunal
    Then I am presented with the profile page for an 'in-person' court or tribunal

    Examples:
      | in_person_court                             |
      | Birmingham Civil and Family Justice Centre  |

  Scenario Outline: Not in-person court or tribunal selection
    And I have entered "<not_in_person_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is not an 'in-person' court or tribunal
    Then I am presented with the profile page for a not 'in-person' court or tribunal

    Examples:
      | not_in_person_court                 |
      | North West Regional Divorce Centre  |

  Scenario Outline: Court or tribunal single address only
    And I have entered "<single_address_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry comprises a single address
    Then the type of address is presented to me on the profile page e.g. "visit or contact us:" or "write to us:"
    And the address for that type is presented to me on the profile page

    Examples:
      | single_address_court                       |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal two addresses
    And I have entered "<multiple_addresses_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry comprises a primary and secondary address
    Then both types of address are presented to me on the profile page e.g. "visit us:" and "write to us:"
    And the addresses for those types are presented on the profile page

    Examples:
      | multiple_addresses_court                      |
      | Darlington Magistrates' Court and Family Court |

  Scenario Outline: Court or tribunal additional information
    And I have entered "<additional_info_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry includes additional information for that location
    Then that additional information is presented to me on the profile page

    Examples:
      | additional_info_court     |
      | Leicester Tribunal Hearing Centre   |

  Scenario Outline: Court or tribunal opening times
    And I have entered "<opening_times_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is an 'in-person' court or tribunal
    And that location entry includes opening times for one or more services offered
    Then the type of each service is presented on the profile page
    And the opening days and hours for each service is presented to me on the profile page

    Examples:
      | opening_times_court                        |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal telephone contact details
    And I have entered "<telephone_info_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry includes one or more telephone numbers for a service
    Then the contact description for each service is presented on the profile page
    And the contact details for each service is presented to me on the profile page

    Examples:
      | telephone_info_court                       |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal email contact details
    And I have entered "<email_info_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry includes one or more emails for that service
    Then the email description for each service is presented to me on the profile page
    And the email details for each service is presented to me on the profile page

    Examples:
      | email_info_court                           |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal building facilities
    And I have entered "<building_facilities_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is an 'in-person' court or tribunal
    And that location entry includes one or building facilities
    Then the name of each facility is presented on the profile page
    And the description of each facility is presented to me on the profile page

    Examples:
      | building_facilities_court                  |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal areas of law to be listed
    And I have entered "<area_of_law_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry does not hide listings for areas of law offered by that location
    And that location entry includes hearings for one or more areas of law
    Then a guidance link for each area of law is presented to me on the profile page
    And those area of law details are listed in ascending alphabetical order

    Examples:
      | area_of_law_court                          |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal areas of law not to be listed
    And I have entered "<no_area_of_law_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry hides listings for areas of law offered by that location
    Then no guidance link for the areas of law are presented to me on the profile page

    Examples:
      | no_area_of_law_court              |
      | Tax Chamber (First-tier Tribunal) |

  Scenario Outline: Court or tribunal areas of law not to be listed for not-in-person courts where there is no external link
    And I have entered "<not_in_person_no_area_of_law_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry hides listings for areas of law offered by that location
    Then no guidance link for the areas of law are presented to me on the profile page

    Examples:
      | not_in_person_no_area_of_law_court              |
      | Enforcement (Crime) Contact Centre - Wales, South West & London  |

  Scenario Outline: Court or tribunal court location codes
    And I have entered "<location_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry includes one or more court location codes
    Then each court type is presented on the profile page
    And the court location code for each court type is presented to me on the profile page

    Examples:
      | location_court                             |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal court DX number
    And I have entered "<dx_number_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location entry includes DX details
    Then the DX number is presented to me on the profile page

    Examples:
      | dx_number_court                            |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: In person court or tribunal location details
    And I have entered "<location_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is an 'in-person' court or tribunal
    And I can select the directions hyperlink for that location

    Examples:
      | location_court                             |
      | Birmingham Civil and Family Justice Centre |

  Scenario Outline: Court or tribunal Access Scheme applicable
    And I have entered "<access_scheme_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is an 'in-person' court or tribunal
    And that location participates in the Professional users’ court and tribunal access scheme
    Then a link to learn about the scheme is included

    Examples:
      | access_scheme_court  |
      | Central Family Court |

  Scenario Outline: Court or tribunal Access Scheme not applicable
    And I have entered "<no_access_scheme_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is an 'in-person' court or tribunal
    And that location does not participate in the Professional users’ court and tribunal access scheme
    And a link to learn about the scheme is included

    Examples:
      | no_access_scheme_court |
      | Chancery Division      |

  Scenario: Validate the info display for the Court or tribunal using common platform scheme

    And I have entered "Harrow Crown Court" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location participates in common platform scheme

  Scenario Outline: Not-in-person Court - Get update on application
    And I have entered "<centre_that_should_allow_update_on_application>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And that location is a 'not-in-person' court or tribunal
    Then the get an update on my application section is displayed

    Examples:
      | centre_that_should_allow_update_on_application     |
      | County Court Money Claims Centre (CCMCC)           |

  Scenario Outline: Court or tribunal Find out more about
    And I have entered "<Find_out_more_about_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And That location sidebar includes "<sidebar_entries>"
    Then I click the link "<page_link>" from "<sidebar_entries>" and it takes me to the page"<page_title>"

    Examples:
      | Find_out_more_about_court  | sidebar_entries       | page_title             | page_link                                                      |
      | West London Family Court   | find-out-more-about   | Support Through Court  | Support Through Court (Independent charity) (opens in new tab) |

  Scenario Outline: Not-in-person Court - Find out more about: Financial Remedy
    And I have entered "<not_in_person_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And That location sidebar includes "<sidebar_entries>"
    Then I click the link "<page_link>" from "<sidebar_entries>" and it takes me to the page"<page_title>"

    Examples:
      | not_in_person_court        | sidebar_entries       | page_title                                                                               | page_link                                                                                                                                                   |
      | Divorce Service Centre     | areas-of-law          | Money and property when you divorce or separate: Getting a financial agreement - GOV.UK  | If you are making an application to settle your finances following a divorce (Financial Remedy), please refer to the guidance found here (opens in new tab) |

  Scenario Outline: In-person Court - This location handles: Financial Remedy
    And I have entered "<in_person_court>" as search criteria
    When I have selected to search for that court or tribunal name or address
    Given results are returned
    When I select a court or tribunal link
    And That location sidebar includes "<sidebar_entries>"
    Then I click the link "<page_link>" from "<sidebar_entries>" and it takes me to the page"<page_title>"

    Examples:
      | in_person_court                                         | sidebar_entries       | page_title                                                                               | page_link                             |
      | manchester-civil-justice-centre-civil-and-family-courts | areas-of-law          | Money and property when you divorce or separate: Getting a financial agreement - GOV.UK  | Financial Remedy (opens in new tab) |
