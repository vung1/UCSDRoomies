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
import LikesScreen from "../LikesScreen";
import IconMenu from "../../components/IconMenu";

// IconMenu test cases
describe("Navigation Tests", () => {
  it("should go back to Home page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<LikesScreen navigation={navigation} />);
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

  it("should go back to Messages page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<LikesScreen navigation={navigation} />);
    // access your button
    const matches = screen.getByTestId("matchesIcon");
    // simulate button click
    fireEvent.press(matches);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith(
      "Matches",
      "MatchesScreen",
    );
  });

  it("should go back to Profile page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<LikesScreen navigation={navigation} />);
    // access your button
    const profile = screen.getByTestId("profileIcon");
    // simulate button click
    fireEvent.press(profile);
    // expect result
    await expect(navigation.navigate).toHaveBeenCalledWith(
      "ProfileScreen",
      "ProfileScreen",
    );
  });
});
