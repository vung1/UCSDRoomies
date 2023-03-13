import React from "react";
import * as renderer from "react-test-renderer";

import CreateProfileScreen from "../CreateProfileScreen";

describe("Rendering Tests", () => {
  test("matches snapshot", () => {
    const tree = renderer.create(<CreateProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
