module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // enable additional rules
    // disable rules from base configurations
    'no-console': 0,
    'no-alert': 2,
    'no-use-before-define': 2,
    'no-unused-vars': 2,
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 2,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
};
