import {StyleSheet} from 'react-native';
import {COLOR_DISABLED, COLOR_PRIMARY, COLOR_WHITE} from 'constants/colors';
import {
  DEFAULT_PADDING_HORIZONTAL,
  DEFAULT_PADDING_VERTICAL,
  BORDER_RADIUS,
  ICON_SIZE,
} from 'constants/size';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  modal: {
    margin: DEFAULT_PADDING_HORIZONTAL,
  },
  container: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BORDER_RADIUS,
    paddingTop: DEFAULT_PADDING_VERTICAL,
    paddingBottom: DEFAULT_PADDING_VERTICAL,
  },
  orderButtonContainer: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BORDER_RADIUS,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowColor: '#000000',
    elevation: 10,
    shadowOpacity: 0.08,
  },
  orderButton: {
    marginHorizontal: DEFAULT_PADDING_HORIZONTAL,
    paddingHorizontal: DEFAULT_PADDING_HORIZONTAL,
    backgroundColor: COLOR_PRIMARY,
    shadowColor: COLOR_PRIMARY,
  },
  buttonTitle: {
    color: COLOR_WHITE,
  },
  iconCloseModal: {
    color: COLOR_DISABLED,
    fontSize: ICON_SIZE.SMALL,
    alignSelf: 'flex-end',
    paddingHorizontal: DEFAULT_PADDING_HORIZONTAL / 2,
    paddingTop: DEFAULT_PADDING_HORIZONTAL / 2,
  },
  confirmOrderText: {
    textAlign: 'center',
    paddingHorizontal: DEFAULT_PADDING_HORIZONTAL,
    marginBottom: DEFAULT_PADDING_VERTICAL,
    marginTop: scalePortrait(6),
  },
  readyText: {
    textAlign: 'center',
    flex: 1,
  },
  cancelButton: {
    marginTop: scalePortrait(6),
    marginHorizontal: DEFAULT_PADDING_HORIZONTAL,
    paddingHorizontal: DEFAULT_PADDING_HORIZONTAL,
    backgroundColor: COLOR_DISABLED,
    shadowColor: COLOR_DISABLED,
  },
  cancelText: {
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_PADDING_HORIZONTAL,
  },
  icon: {
    fontSize: ICON_SIZE.SMALL,
    backgroundColor: COLOR_PRIMARY,
    color: 'white',
    padding: scalePortrait(2),
    // borderRadius: scalePortrait(ICON_SIZE.SMALL),
  },
});
