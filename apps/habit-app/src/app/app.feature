Feature: App

  Scenario: Authenticated User
    Given I am a Authenticated User
    When App is loaded
    Then I should see Habits Screen

  Scenario: Public User
    Given I am a Public User
    When App is loaded
    Then I should see Login Screen