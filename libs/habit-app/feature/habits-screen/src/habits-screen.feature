Feature: Habits Screen

  Scenario: No habits
    Given I have no habits
    When I am at the Habits Screen
    Then I should see empty state text

  Scenario: Create habit
    Given I am at the Habits Screen
    When I press Create Habit Button
    Then I should see Habit Create Screen

  Scenario: Have habits
    Given I have habits
    When I am at the Habits Screen
    Then I should see not empty state text

  Scenario: View habit
    Given I am at the Habits Screen
    When I press first Habit
    Then I should see Habit View Screen