Feature: Habits Screen

  Scenario: No habits
    Given no habits
    When I am at the Habits Screen
    Then I should see empty state text

  Scenario: Create habit
    Given I am at the Habits Screen
    When I press Create Habit Button
    Then I should see Habit Create Screen