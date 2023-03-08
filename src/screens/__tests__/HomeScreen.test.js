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
import HomeScreen from "../HomeScreen";
import IconMenu from "../../components/IconMenu";

// it('the swiper is on the home screen', async () => {
//     await render(<HomeScreen />);
//     await waitFor(() => {
//     expect(screen.getByTestId('swiper')).toBeInTheDocument();

//       render(<App />);
//   const linkElement = screen.getByText(/learn Slide/i);
//   expect(linkElement).toBeInTheDocument();
//   });
// });

// IconMenu test cases
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
  expect(navigation.navigate).toHaveBeenCalledWith("Matches", "MatchesScreen");
});
