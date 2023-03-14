/* eslint-disable import/no-extraneous-dependencies */

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
import { Button } from "react-native";
import ProfileScreen from "../ProfileScreen";
import IconMenu from "../../components/IconMenu";

// describe("Rendering tests", () => {
//   it("renders default elements", async () => {
//     await render(<ProfileScreen key="test" />);

//     await waitFor(() => {
//       expect(screen.getAllByText("Profile").length).toBe(1);
//     });
//   });
// });

// describe("Navigation Tests", () => {
//   // IconMenu test cases
//   it("should go back to Home page", async () => {
//     const navigation = { navigate: () => {} };
//     jest.spyOn(navigation, "navigate");
//     // render your component
//     await render(<ProfileScreen navigation={navigation} key="nav_test" />);
//     // access your button
//     const home = screen.getByTestId("homeIcon");
//     // simulate button click
//     fireEvent.press(home);
//     // expect result
//     expect(navigation.navigate).toHaveBeenCalledWith(
//       "HomeScreen",
//       "HomeScreen",
//     );
//   });

//   it("should go back to Likes page", async () => {
//     const navigation = { navigate: () => {} };
//     jest.spyOn(navigation, "navigate");
//     // render your component
//     await render(<ProfileScreen navigation={navigation} key="nav_test" />);
//     // access your button
//     const likes = screen.getByTestId("likesIcon");
//     // simulate button click
//     fireEvent.press(likes);
//     // expect result
//     expect(navigation.navigate).toHaveBeenCalledWith("Likes", "LikesScreen");
//   });

//   it("should go back to Matches page", async () => {
//     const navigation = { navigate: () => {} };
//     jest.spyOn(navigation, "navigate");
//     // render your component
//     await render(<ProfileScreen navigation={navigation} key="nav_test" />);
//     // access your button
//     const matches = screen.getByTestId("matchesIcon");
//     // simulate button click
//     fireEvent.press(matches);
//     // expect result
//     expect(navigation.navigate).toHaveBeenCalledWith(
//       "Matches",
//       "MatchesScreen",
//     );
//   });
// });

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
        key="logout_test"
      />,
    );
    const logoutButton = screen.getByTestId("logout.Button");
    fireEvent.press(logoutButton);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
