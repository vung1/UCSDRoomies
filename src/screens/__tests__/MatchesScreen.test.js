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
import MatchesScreen from "../MatchesScreen";
import IconMenu from "../../components/IconMenu";

// IconMenu test cases
it("should go back to Home page", async () => {
  const navigation = { navigate: () => {} };
  spyOn(navigation, "navigate");
  // render your component
  const page = render(<MatchesScreen navigation={navigation} />);
  // access your button
  const home = page.getByTestId("homeIcon");
  // simulate button click
  fireEvent.press(home);
  // expect result
  expect(navigation.navigate).toHaveBeenCalledWith("HomeScreen", "HomeScreen");
});

it("should go back to Likes page", async () => {
  const navigation = { navigate: () => {} };
  spyOn(navigation, "navigate");
  // render your component
  const page = render(<MatchesScreen navigation={navigation} />);
  // access your button
  const matches = page.getByTestId("likesIcon");
  // simulate button click
  fireEvent.press(matches);
  // expect result
  expect(navigation.navigate).toHaveBeenCalledWith("Likes", "LikesScreen");
});
