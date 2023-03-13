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
import LoginScreen from "../LoginScreen";
import SigninButton from "../../components/SigninButton";

describe("Rendering Tests", () => {
  it("renders default elements", async () => {
    await render(<LoginScreen />);
    expect(screen.getAllByText("SIGN IN WITH UCSD EMAIL").length).toBe(1);
    expect(screen.getAllByText("SIGN UP WITH UCSD EMAIL").length).toBe(1);
  });

  test("snapshot matches", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Test navigation
describe("Navigation Tests", () => {
  it("should go to SignIn screen when tapped", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<LoginScreen navigation={navigation} />);
    // access your button
    const button = screen.getByTestId("Signin.Button");
    // simulate button click
    fireEvent.press(button);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith(
      "SigninScreen",
      "SigninScreen",
    );
  });

  it("should go to SignUp screen when tapped", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<LoginScreen navigation={navigation} />);
    // access your button
    const button = screen.getByTestId("Signup.Button");
    // simulate button click
    fireEvent.press(button);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith(
      "SignupScreen",
      "SignupScreen",
    );
  });
});
