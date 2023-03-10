import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
} from "@testing-library/react-native";

import SignupScreen from "../SignupScreen";
import LoginLogo from "../../components/LoginLogo";
import * as renderer from "react-test-renderer";

describe('Rendering Tests', () => {
  it("renders default elements", async () => {
    await render(<SignupScreen />);

    await waitFor(() => {
      expect(screen.getAllByText("SIGN UP WITH UCSD EMAIL").length).toBe(1);
      screen.getByPlaceholderText("UCSD Email");
      screen.getByPlaceholderText("Password");
      screen.getByPlaceholderText("Confirm Password");
    });
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<SignupScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Navigation Tests', () => {
  it("should go back to LoginScreen", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<SignupScreen navigation={navigation} />);
    // access your button
    const button = page.getByTestId("BackButton");
    // simulate button click
    fireEvent.press(button);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("LoginScreen", {
      screen: "LoginScreen",
    });
  });
});