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
import ProfileScreen from "../ProfileScreen";
import IconMenu from "../../components/IconMenu";
import {Button} from "react-native";

describe('Rendering tests', () => {
  it("renders default elements", async () => {
    await render(<ProfileScreen />);

    await waitFor(() => {
      expect(screen.getAllByText("Profile").length).toBe(1);
    });
  });

});

describe('Navigation Tests', () => {
  // IconMenu test cases
  it("should go back to Home page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<ProfileScreen navigation={navigation} />);
    // access your button
    const home = page.getByTestId("homeIcon");
    // simulate button click
    fireEvent.press(home);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("HomeScreen", "HomeScreen");
  });

  it("should go back to Likes page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<ProfileScreen navigation={navigation} />);
    // access your button
    const likes = page.getByTestId("likesIcon");
    // simulate button click
    fireEvent.press(likes);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("Likes", "LikesScreen");
  });
  
  it("should go back to Likes page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<ProfileScreen navigation={navigation} />);
    // access your button
    const matches = page.getByTestId("matchesIcon");
    // simulate button click
    fireEvent.press(matches);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("Matches", "MatchesScreen");
  });
});

// Logout test
describe('Logout Test', () => {
  const mockLogOut = jest.fn()
  test("should logout of app", async () => {
    // await render(<HomeScreen />);
    render(<Button title="mock button" testID="logout.Button" onPress={mockLogOut} />);
    const logoutButton = screen.getByTestId('logout.Button');
    fireEvent.press(logoutButton);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});