import React from "react";

import { render, screen, act, waitFor } from "@testing-library/react-native";

import SigninScreen from "../SigninScreen";

it("renders default elements", async () => {
  render(<SigninScreen />);

  expect(await screen.getAllByText("SIGN IN WITH UCSD EMAIL").length).toBe(1);
});
