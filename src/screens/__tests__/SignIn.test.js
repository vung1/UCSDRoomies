import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
} from "@testing-library/react-native";

import SigninScreen from "../SigninScreen";
import LoginLogo from "../../components/LoginLogo";

it("renders default elements", async () => {
  await render(<SigninScreen />);

  await waitFor(() => {
    expect(screen.getAllByText("SIGN IN WITH UCSD EMAIL").length).toBe(1);
    screen.getByPlaceholderText("UCSD Email");
    screen.getByPlaceholderText("Password");
  });
});
