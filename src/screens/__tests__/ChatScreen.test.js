/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable testing-library/prefer-screen-queries */
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
} from "@testing-library/react-native";

import * as renderer from "react-test-renderer";

import { useParams } from "react-router-dom";
import ChatScreen from "../ChatScreen";
import LoginLogo from "../../components/LoginLogo";

describe("Rendering Tests", () => {
  it("renders default elements", async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    await render(<ChatScreen />);

    await waitFor(() => {
      expect(screen.getAllByText("New Matches").length).toBe(1);
    });
  });
});

// Back button
describe("Back button Test", () => {
  it("should go back to MatchesScreen", async () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, "navigate");
    // render your component
    const view = render(<ChatScreen navigation={navigation} />);
    // access your button
    const button = view.getByTestId("BackButton");
    // simulate button click
    fireEvent.press(button);
    // expect result
    expect(navigation.navigate).toHaveBeenCalledWith("MatchesScreen", {
      screen: "MatchesScreen",
    });
  });
});
