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

it("renders default elements", async () => {
  await render(<LoginScreen />);

  await waitFor(() => {
    expect(screen.getAllByText("SIGN IN WITH UCSD EMAIL").length).toBe(1);
    expect(screen.getAllByText("SIGN UP WITH UCSD EMAIL").length).toBe(1);
  });
});

test("renders correctly", () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should go to SignIn screen when tapped", async () => {
  const navigation = { navigate: () => {} };
  spyOn(navigation, "navigate");
  // render your component
  const page = render(<LoginScreen navigation={navigation} />);
  // access your button
  const button = page.getByTestId("Signin.Button");
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
  spyOn(navigation, "navigate");
  // render your component
  const page = render(<LoginScreen navigation={navigation} />);
  // access your button
  const button = page.getByTestId("Signup.Button");
  // simulate button click
  fireEvent.press(button);
  // expect result
  expect(navigation.navigate).toHaveBeenCalledWith(
    "SignupScreen",
    "SignupScreen",
  );
});
