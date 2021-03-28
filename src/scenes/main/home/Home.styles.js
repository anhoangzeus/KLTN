import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: '#a2459a',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: SIZE.DEVICE_HEIGHT / 50,
    paddingHorizontal: 12,
    borderRadius: 2,
    height: SIZE.DEVICE_HEIGHT / 10,
    width: SIZE.DEVICE_WIDTH * 0.8,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  cartContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: 75,
    borderRadius: 15,
    paddingTop: 5,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  proHotContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: SIZE.DEVICE_HEIGHT / 2.3,
  },
  reviewimg: {
    height: SIZE.DEVICE_HEIGHT / 50,
    marginLeft: SIZE.DEVICE_WIDTH / 60,
  },
  loadingview: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  loadingImage: {
    width: SIZE.DEVICE_WIDTH,
    height: SIZE.DEVICE_HEIGHT,
    resizeMode: 'contain',
  },
  activityView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  cartView: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    marginLeft: SIZE.DEVICE_WIDTH / 30,
    width: SIZE.DEVICE_WIDTH / 20,
  },
  cartText: {
    alignSelf: 'center',
    fontSize: 10,
    margin: 1,
    fontWeight: 'bold',
    color: 'white',
  },
  safeContainer: {
    flex: 1,
    color: '#a2459a',
  },
});
