Feature: Habits Screen

  Scenario: No habits
    Given no habits
    When I am at the Habits Screen
    Then I can see empty state text