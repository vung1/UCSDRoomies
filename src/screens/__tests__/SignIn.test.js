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

import firebase from "../../../firebase"
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Default rendering test
it("renders default elements", async () => {
  await render(<SigninScreen />);

  await waitFor(() => {
    expect(screen.getAllByText("SIGN IN WITH UCSD EMAIL").length).toBe(1);
    screen.getByPlaceholderText("UCSD Email");
    screen.getByPlaceholderText("Password");
  });

});

// Sign In logic (error messages) tests
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

// Back button
it('should go back to LoginScreen', async () => {
    const navigation = {navigate: () => {}};
    spyOn(navigation, 'navigate');
    // render your component
    const page = render(<SigninScreen navigation = {navigation}/>);
    // access your button
    const button = page.getByTestId('BackButton');
    // simulate button click
    fireEvent.press(button); 
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("LoginScreen", {"screen": "LoginScreen"} );
});

// Firebase authentication tests
// Mock all the exports in the module.
// function mockFirebaseService() {
//   return new Promise(resolve => resolve(true));
// }

// Since "services/firebase" is a dependency on this file that we are testing,
// we need to mock the child dependency.
// jest.mock('../../../firebase', () => new Promise(resolve => resolve(true)));

// describe('sign in', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({});
//   });

//   it('signIn should call firebase', () => {
//     const user = {
//       email: 'brian@ucsd.edu',
//       password: '123456'
//     };

//     store.dispatch(signIn(user.email, user.password)).then(() => {
//       expect(mockFirebaseService).toHaveBeenCalled();
//     });
//   });
// });
