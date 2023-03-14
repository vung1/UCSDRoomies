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
    await jest.spyOn(navigation, "navigate");
    // render your component
    await render(<MatchesScreen navigation={navigation} />);
    // access your button
    const home = screen.getByTestId("homeIcon");
    // simulate button click
    fireEvent.press(home);
    // expect result
    await expect(navigation.navigate).toHaveBeenCalledWith(
      "HomeScreen",
      "HomeScreen",
    );
  });

  it("should go back to Likes page", async () => {
    const navigation = { navigate: () => {} };
    await jest.spyOn(navigation, "navigate");
    // render your component
    await render(<MatchesScreen navigation={navigation} />);
    // access your button
    const like = screen.getByTestId("likesIcon");
    // simulate button click
    fireEvent.press(like);
    // expect result
    await expect(navigation.navigate).toHaveBeenCalledWith(
      "Likes",
      "LikesScreen",
    );
  });

  it("should go back to Profile page", async () => {
    const navigation = { navigate: () => {} };
    await jest.spyOn(navigation, "navigate");
    // render your component
    await render(<MatchesScreen navigation={navigation} />);
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

describe("matching users test", () => {
  const user1 = { id: 1, likes: [2, 3] };
  const user2 = { id: 2, likes: [1, 3] };
  const user3 = { id: 3, likes: [2, 2] };

  function matchUsers(sampleUser1, sampleUser2) {
    if (
      sampleUser1.likes.includes(sampleUser2.id) &&
      sampleUser2.likes.includes(sampleUser1.id)
    ) {
      return true;
    }
    return false;
  }

  it("matches two users who like each other", () => {
    expect(matchUsers(user1, user2)).toBe(true);
  });

  it("does not match two users who do not like each other", () => {
    expect(matchUsers(user1, user3)).toBe(false);
  });

  it("matches two users who like each other, regardless of order", () => {
    expect(matchUsers(user2, user1)).toBe(true);
  });
});
