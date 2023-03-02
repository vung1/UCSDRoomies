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

it("renders default elements", async () => {
  await render(<SignupScreen />);

  await waitFor(() => {
    expect(screen.getAllByText("SIGN UP WITH UCSD EMAIL").length).toBe(1);
    screen.getByPlaceholderText("UCSD Email");
    screen.getByPlaceholderText("Password");
    screen.getByPlaceholderText("Confirm Password");
  });

});
