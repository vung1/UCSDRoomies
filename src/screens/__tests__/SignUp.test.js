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
import SignupScreen from "../SignupScreen";
import LoginLogo from "../../components/LoginLogo";

describe("Rendering Tests", () => {
  it("renders default elements", async () => {
    await render(<SignupScreen />);

    await waitFor(() => {
      expect(screen.getAllByText("SIGN UP WITH UCSD EMAIL").length).toBe(1);
      screen.getByPlaceholderText("UCSD Email");
      screen.getByPlaceholderText("Password");
      screen.getByPlaceholderText("Confirm Password");
    });
  });

  test("matches snapshot", async () => {
    const tree = renderer.create(<SignupScreen />).toJSON();
    await expect(tree).toMatchSnapshot();
  });
});

describe("Navigation Tests", () => {
  it("should go back to LoginScreen", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    await render(<SignupScreen navigation={navigation} />);
    // access your button
    const button = screen.getByTestId("BackButton");
    // simulate button click
    fireEvent.press(button);
    // expect result
    await expect(navigation.navigate).toHaveBeenCalledWith("LoginScreen", {
      screen: "LoginScreen",
    });
  });
});
