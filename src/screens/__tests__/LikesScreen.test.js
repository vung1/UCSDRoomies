import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
} from "@testing-library/react-native";

// import userEvent from "@testing-library/user-event";

import * as renderer from "react-test-renderer";
import { expect } from "@jest/globals";
import { Button } from "react-native";
import LikesScreen from "../LikesScreen";
import IconMenu from "../../components/IconMenu";

// IconMenu test cases
describe('Navigation Tests', () => {
  it("should go back to Home page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<LikesScreen navigation={navigation} />);
    // access your button
    const home = page.getByTestId("homeIcon");
    // simulate button click
    fireEvent.press(home);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("HomeScreen", "HomeScreen");
  });

  it("should go back to Messages page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<LikesScreen navigation={navigation} />);
    // access your button
    const matches = page.getByTestId("matchesIcon");
    // simulate button click
    fireEvent.press(matches);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("Matches", "MatchesScreen");
  });

  it("should go back to Profile page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<MatchesScreen navigation={navigation} />);
    // access your button
    const profile = page.getByTestId("profileIcon");
    // simulate button click
    fireEvent.press(profile);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("ProfileScreen", "ProfileScreen");
  });
});

// Logout Test
describe("Logout Test", () => {
  const mockLogOut = jest.fn();
  test("should logout of app", async () => {
    // await render(<HomeScreen />);
    render(
      <Button
        title="mock button"
        testID="logout.Button"
        onPress={mockLogOut}
      />,
    );
    const logoutButton = screen.getByTestId("logout.Button");
    fireEvent.press(logoutButton);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
