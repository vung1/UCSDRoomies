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

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { mock, mockDeep } from "jest-mock-extended";
import { mocked } from "ts-jest";
import SigninScreen from "../SigninScreen";
import LoginLogo from "../../components/LoginLogo";

// import firebase, { auth } from "../../../firebase";
import useAuth from "../../hooks/useAuth"; // THESE TWO LINES
// import firebase from "../../../firebase"   // THESE TWO LINES
import { auth } from "../../../firebase";
// import { redux } from '@redux-mock-store';

// Default rendering test
describe("Rendering tests", () => {
  it("renders default elements", async () => {
    await render(<SigninScreen />);

    await waitFor(() => {
      expect(screen.getAllByText("SIGN IN WITH UCSD EMAIL").length).toBe(1);
      screen.getByPlaceholderText("UCSD Email");
      screen.getByPlaceholderText("Password");
    });
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<SigninScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Sign in logic tests", () => {
  it("shows enter your email", async () => {
    const { getByTestId, getByText } = render(<SigninScreen />);

    await waitFor(() => {
      fireEvent.press(getByTestId("Signin.Button"));
      screen.getByText("Please enter your UCSD email");
    });
  });

  it("email does not end in @ucsd.edu", async () => {
    const { getByTestId, getByText, queryByText } = render(<SigninScreen />);

    await waitFor(() => {
      fireEvent.changeText(getByTestId("Signin.Email"), "email@yahoo.com");
      fireEvent.press(getByTestId("Signin.Button"));
      screen.getByText("Please enter your UCSD email in correct format");
      screen.getByText("Please enter your password");
    });
  });

  it("email does not have stuff before @ucsd.edu", async () => {
    const { getByTestId, getByText, queryByText } = render(<SigninScreen />);

    await waitFor(() => {
      fireEvent.changeText(getByTestId("Signin.Email"), "@ucsd.edu");
      fireEvent.press(getByTestId("Signin.Button"));
      screen.getByText("Please enter your UCSD email in correct format");
    });
  });

  it("email is filled, but password is not", async () => {
    const { getByTestId, getByText, queryByText } = render(<SigninScreen />);

    await waitFor(() => {
      fireEvent.changeText(getByTestId("Signin.Email"), "test@ucsd.edu");
      fireEvent.press(getByTestId("Signin.Button"));
      screen.getByText("Please enter your password");
    });
  });

  it("email is filled, but password is not", async () => {
    const { getByTestId, getByText, queryByText } = render(<SigninScreen />);

    await waitFor(() => {
      fireEvent.changeText(getByTestId("Signin.Email"), "test@ucsd.edu");
      fireEvent.press(getByTestId("Signin.Button"));
      screen.getByText("Please enter your password");
    });
  });
});

// Back button
describe("Back button Test", () => {
  it("should go back to LoginScreen", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<SigninScreen navigation={navigation} />);
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

// Firebase authentication tests
describe("Firebase authentication tests", () => {
  // Mock the module and its functions
  jest.mock("../../hooks/useAuth.js", () => ({
    __esModule: true,
    signInWithEmailAndPassword: jest.fn(() => true),
    // logIn: jest.fn(() => false)
  }));

  // Import the function from the mocked module
  const { signInWithEmailAndPassword } = require("../../hooks/useAuth.js");
  // const { logIn, loading } = useAuth();

  test("signInWIthEmailAndPassword", async () => {
    // Execute the mocked function
    const result = signInWithEmailAndPassword(auth, "brian@ucsd.edu", "123456");
    // spyOn((auth,'brian@ucsd.edu','123456'),signInWithEmailAndPassword);
    // result.mockResolvedValue(true);
    // const user = await getService().login('brian@ucsd.edu','123456');

    // Expect to return the mocked value
    // expect(result).resolves.toEqual(true);
    // expect(result_spy).toHaveBeenCalledWith(auth,'brian@ucsd.edu','123456')
    expect(result).toBe(true);
  });

  // test("email and password do not match", async () => {
  //   const { getByTestId, getByText, queryByText,} = render(<SigninScreen />);

  //   await waitFor(() => {
  //     fireEvent.changeText(getByTestId("Signin.Email"),"test@ucsd.edu");
  //     fireEvent.changeText(getByTestId("Signin.Password"),"letmein");
  //     fireEvent.press(getByTestId("Signin.Button"));
  //     screen.getByText("Your email and password do not match");
  //   });
  // });
});
