module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "react",
    "react-native",
    "react-hooks",
    "jsx-a11y",
    "import",
    "prettier",
  ],
  parser: "@babel/eslint-parser",
  env: {
    jest: true,
    "react-native/react-native": true,
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "padded-blocks": "off",
    "arrow-body-style": "off",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "react-native/split-platform-components": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
    quotes: ["error", "double", { avoidEscape: true }],
  },
  globals: {
    fetch: false,
  },
};
