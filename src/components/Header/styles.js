import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';
export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: '#2B4F8C',
    justifyContent: 'space-between',
    paddingBottom: 5,
    height: SIZE.DEVICE_HEIGHT / 15,
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 75,
  },
  cartIcon: {
    width: 24,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  cartView: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    marginLeft: SIZE.DEVICE_WIDTH / 25,
    minWidth: 12,
    minHeight: 12,
    zIndex: 1,
    right: -5,
  },
  cartText: {
    alignSelf: 'center',
    fontSize: 8,
    margin: 1,
    fontWeight: 'bold',
    color: 'white',
  },
});
