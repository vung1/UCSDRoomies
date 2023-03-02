import React from "react";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  mount,
} from "@testing-library/react-native";

import * as renderer from 'react-test-renderer';

import InitScreen from "../InitScreen";
import LoginLogo from "../../components/LoginLogo";

test('renders correctly', () => {
  const tree = renderer.create(<InitScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
