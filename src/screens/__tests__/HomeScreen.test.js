import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
  container,
} from "@testing-library/react-native";

// import userEvent from "@testing-library/user-event";

import * as renderer from "react-test-renderer";
import { expect } from "@jest/globals";
import { Button } from "react-native";
import { Swiper } from "react-native-swiper";
import HomeScreen from "../HomeScreen";
import IconMenu from "../../components/IconMenu";

// IconMenu test cases
describe("Navigation Tests", () => {
  it("should go back to Likes page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<HomeScreen navigation={navigation} />);
    // access your button
    const likes = page.getByTestId("likesIcon");
    // simulate button click
    fireEvent.press(likes);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("Likes", "LikesScreen");
  });

  it("should go back to Messages page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<HomeScreen navigation={navigation} />);
    // access your button
    const matches = page.getByTestId("matchesIcon");
    // simulate button click
    fireEvent.press(matches);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith(
      "Matches",
      "MatchesScreen",
    );
  });

  it("should go back to Profile page", async () => {
    const navigation = { navigate: () => {} };
    spyOn(navigation, "navigate");
    // render your component
    const page = render(<HomeScreen navigation={navigation} />);
    // access your button
    const profile = page.getByTestId("profileIcon");
    // simulate button click
    fireEvent.press(profile);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("ProfileScreen", "ProfileScreen");
  });
});

describe("Swiping Tests", () => {
  it("the swiper is on the home screen", async () => {
    // test that swiper is in view
    await render(<HomeScreen />);
    // const view = screen.getByTestId("view.container")
    // expect(view).toBeDefined();
    // const { getByTestId } = render(<Swiper />);
    const logSpy = jest.spyOn(global.console, "log");
    // const swiper = getByTestId('swiper');
    const swiper = screen.getByTestId("swiper");
    expect(swiper).toBeTruthy();

    await waitFor(() => {
      fireEvent(findByTestId("swiper"), "leftSwipe");
      expect(logSpy).toHaveBeenCalledWith("Swipe PASS");
    });
  });
});

// Logout test
describe("Logout Test", () => {
  const mockLogOut = jest.fn();
  test("should logout of app", async () => {
    // await render(<HomeScreen />);
    render(
      <Button
        title="mock button"
        testID="logout.Button"
        onPress={mockLogOut}
      />,
    );
    const logoutButton = screen.getByTestId("logout.Button");
    fireEvent.press(logoutButton);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
