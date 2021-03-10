import {StyleSheet} from 'react-native';
import {scalePortrait} from 'utils/responsive';
export default StyleSheet.create({
  container: {
    width: scalePortrait(60),
    height: scalePortrait(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    zIndex: 9,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
  },
});
