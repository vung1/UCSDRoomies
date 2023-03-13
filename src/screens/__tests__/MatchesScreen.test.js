/* eslint-disable import/no-extraneous-dependencies */

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
import MatchesScreen from "../MatchesScreen";
import IconMenu from "../../components/IconMenu";

describe("Navigation Tests", () => {
  // IconMenu test cases
  it("should go back to Home page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<MatchesScreen navigation={navigation} />);
    // access your button
    const home = screen.getByTestId("homeIcon");
    // simulate button click
    fireEvent.press(home);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith(
      "HomeScreen",
      "HomeScreen",
    );
  });

  it("should go back to Likes page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<MatchesScreen navigation={navigation} />);
    // access your button
    const like = screen.getByTestId("likesIcon");
    // simulate button click
    fireEvent.press(like);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("Likes", "LikesScreen");
  });

  it("should go back to Profile page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<MatchesScreen navigation={navigation} />);
    // access your button
    const profile = screen.getByTestId("profileIcon");
    // simulate button click
    fireEvent.press(profile);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith(
      "ProfileScreen",
      "ProfileScreen",
    );
  });
});

// Logout test
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
