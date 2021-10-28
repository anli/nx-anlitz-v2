Feature: Habit Create Screen

  Scenario: No input
    Given I am at the Habit Create Screen
    Then I should see form

  Scenario: Submit with errors
    Given I am at the Habit Create Screen
    When I submit form
    Then I should see validation error message

  Scenario: Submit
    Given I am at the Habit Create Screen
    When I update form correctly
    And I submit form
    Then I should go back to the previous screen