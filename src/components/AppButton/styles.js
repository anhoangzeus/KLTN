import {StyleSheet} from 'react-native';
import {
  COLOR_DISABLED,
  COLOR_PRIMARY,
  COLOR_TEXT_DISABLE,
} from 'constants/colors';
import {BORDER_RADIUS_BUTTON, ICON_SIZE} from 'constants/size';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  linearContainer: {
    borderRadius: BORDER_RADIUS_BUTTON,
    alignItems: 'center',
  },
  defaultButton: (disable) => ({
    borderRadius: BORDER_RADIUS_BUTTON,
    alignItems: 'center',
    // flex: 1,
    backgroundColor: disable ? COLOR_DISABLED : COLOR_PRIMARY,
    elevation: 0,
    height: scalePortrait(48),
  }),
  icon: (disabled) => ({
    color: disabled ? COLOR_TEXT_DISABLE : '#fff',
    fontSize: ICON_SIZE.NORMAL,
  }),
  title: (disable) => ({
    color: disable ? COLOR_TEXT_DISABLE : '#fff',
  }),
});
