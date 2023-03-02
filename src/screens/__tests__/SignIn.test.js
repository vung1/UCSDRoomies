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

it("shows enter your email", async () => {
  const { getByTestId, getByText } = render(<SigninScreen />);
  
  await waitFor(() => {
    fireEvent.press(getByTestId("Signin.Button"));
    getByText("* Please enter your email");
  });
});

it("email does not end in @ucsd.edu", async () => {
  const { getByTestId, getByText, queryByText,} = render(<SigninScreen />);
  
  await waitFor(() => {
    fireEvent.changeText(getByTestId("Signin.Email"),"email@yahoo.com");
    fireEvent.press(getByTestId("Signin.Button"));
    getByText("* Please enter your UCSD email in right format");
  });
});

it("email does not have stuff before @ucsd.edu", async () => {
  const { getByTestId, getByText, queryByText,} = render(<SigninScreen />);

  await waitFor(() => {
  fireEvent.changeText(getByTestId("Signin.Email"),"@ucsd.edu");
  fireEvent.press(getByTestId("Signin.Button"));
  getByText("* Please enter your UCSD email in right format");
  });
});

it("email is filled, but password is not", async () => {
  const { getByTestId, getByText, queryByText,} = render(<SigninScreen />);

  await waitFor(() => {
    fireEvent.changeText(getByTestId("Signin.Email"),"test@ucsd.edu");
    fireEvent.press(getByTestId("Signin.Button"));
    getByText("* Please enter your password");
  });
});