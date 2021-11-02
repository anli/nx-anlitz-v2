Feature: Habit View Screen

  Scenario: See habit information
    Given I am at the Habit View Screen
    Then I should see habit information

  Scenario: Delete a habit
    Given I am at the Habit Create Screen
    When I delete a habit
    Then I should see habit deleted
