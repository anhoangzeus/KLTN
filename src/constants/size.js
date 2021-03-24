import { Dimensions } from 'react-native';
import { scalePortrait } from '../utils/responsive';

// Dimensions
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const DEFAULT_PADDING_HORIZONTAL = scalePortrait(16);
export const DEFAULT_PADDING_VERTICAL = scalePortrait(16);
export const ITEM_PADDING_VERTICAL = scalePortrait(8);
export const DEVICE_WIDTH = deviceWidth;
export const DEVICE_HEIGHT = deviceHeight;
export const BORDER_RADIUS = scalePortrait(6);
export const BORDER_RADIUS_BUTTON = scalePortrait(20);
export const BORDER_RADIUS_TEXT_INPUT = scalePortrait(25);
export const HEADER_ICON_SIZE = 24;

export default {
  DEFAULT_PADDING_HORIZONTAL,
  DEFAULT_PADDING_VERTICAL,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  HEADER_ICON_SIZE,
};

// ICON_SIZE
export const ICON_SIZE = {
  SMALL: scalePortrait(16),
  NORMAL: scalePortrait(24),
  FIT: scalePortrait(26),
  LARGE: scalePortrait(30),
  X_LARGE: scalePortrait(36),
};
