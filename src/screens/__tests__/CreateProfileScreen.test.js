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

import CreateProfileScreen from "../CreateProfileScreen";
import LoginLogo from "../../components/LoginLogo";

describe('Rendering Tests', () => {
  test("matches snapshot", () => {
    const tree = renderer.create(<CreateProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});