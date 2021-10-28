Feature: Habit Create

  Scenario: Create a habit
    Given I am at Habit Create Screen
    When I update form
    And I submit form
    Then I should see Habits Screen