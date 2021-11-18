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

  Scenario: Logout
    Given I am at the Habits Screen
    When I press Logout Button
    Then I should be logged out

  Scenario: See correct header title when previous period is press
    Given I am at the Habits Screen
    When I press Previous Period Button 4 times
    Then I should see header title with date range 4 weeks ago

  Scenario: See correct header title when next period is press
    Given I am at the Habits Screen
    When I press Next Period Button
    Then I should see header title with date range 1 week later

  Scenario: See correct header title when next period is press
    Given I am at the Habits Screen
    And I am at date period 1 week later
    When I press Today Button
    Then I should see header title with this week date range

  Scenario: Press checked Habit Activity Day Checkbox
    Given I am at the Habits Screen
    When I press checked Habit Activity Day Checkbox
    Then I should see Habit Activity Day updated

  Scenario: Press unchecked Habit Activity Day Checkbox
    Given I am at the Habits Screen
    When I press unchecked Habit Activity Day Checkbox
    Then I should see Habit Activity Day updated