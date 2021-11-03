Feature: Habit Update Screen

  Scenario: Has data
    Given I am at the Habit Update Screen
    Then I should see form prefilled with data

  Scenario: Submit with errors
    Given I am at the Habit Update Screen
    When I submit form with invalid data
    Then I should see validation error message

  Scenario: Submit
    Given I am at the Habit Update Screen
    When I update form correctly
    And I submit form
    Then I should go back to the previous screen