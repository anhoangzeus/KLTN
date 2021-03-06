import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#2B4F8C',
    paddingHorizontal: 12,
    marginTop: 1,
  },
  sectionImage: {
    width: SIZE.DEVICE_WIDTH - 24,
    height: SIZE.DEVICE_HEIGHT / 4.5,
    borderRadius: 10,
    resizeMode: 'center',
  },
});
