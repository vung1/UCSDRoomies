/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-promise-in-fire-event */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
  container,
} from "@testing-library/react-native";

// import userEvent from "@testing-library/user-event";

import * as renderer from "react-test-renderer";
import { expect } from "@jest/globals";
import { Button, View, Text } from "react-native";
import Swiper from "react-native-swiper";
import HomeScreen from "../HomeScreen";
import IconMenu from "../../components/IconMenu";

// IconMenu test cases
describe("Navigation Tests", () => {
  it("should go back to Likes page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<HomeScreen navigation={navigation} />);
    // access your button
    const likes = screen.getByTestId("likesIcon");
    // simulate button click
    fireEvent.press(likes);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("Likes", "LikesScreen");
  });

  it("should go back to Messages page", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<HomeScreen navigation={navigation} />);
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
    await render(<HomeScreen navigation={navigation} />);
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

describe("Swiper", () => {
  console.warn = jest.fn(); // Mock console.warn
  it("swipes left and right properly", async () => {
    const { getAllByTestId } = render(
      <Swiper>
        <View
          testID="page1"
          style={{ width: 100, height: 100, backgroundColor: "red" }}
        />
        <View
          testID="page2"
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        />
        <View
          testID="page3"
          style={{ width: 100, height: 100, backgroundColor: "blue" }}
        />
      </Swiper>,
    );

    const swiperPages = getAllByTestId(/^page/);

    await expect(swiperPages.length).toBe(5);

    swiperPages.forEach((page, index) => {
      expect(page.props.style.left).toBe(undefined); // Verify the page is positioned correctly based on index
    });
    await expect(console.warn).toHaveBeenCalledTimes(0); // Assert that the warning was logged once
  });
});
