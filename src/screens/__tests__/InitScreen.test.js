import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
} from "@testing-library/react-native";

import * as renderer from "react-test-renderer";

import InitScreen from "../InitScreen";
import LoginLogo from "../../components/LoginLogo";

describe("Rendering Tests", () => {
  test("matches snapshot", async () => {
    jest.useFakeTimers();
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // jest.spyOn(navigation, "navigate");
    const tree = renderer
      .create(<InitScreen navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();

    // Advance the timer by 4 seconds to simulate the timeout
    jest.advanceTimersByTime(1000);

    // Verify that the navigation occurs after the timeout
    await expect(navigation.navigate).toHaveBeenCalledWith(
      "LoginScreen",
      "LoginScreen",
    );
  });
});
