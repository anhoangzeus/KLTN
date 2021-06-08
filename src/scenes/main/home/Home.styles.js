import SIZE from 'constants/size';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screenContainersafe: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: '#2B4F8C',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 2,
    height: SIZE.DEVICE_HEIGHT * 0.05,
    maxWidth: SIZE.DEVICE_WIDTH * 0.75,
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
    width: 25,
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
    height: SIZE.DEVICE_HEIGHT * 0.5,
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
    marginLeft: SIZE.DEVICE_WIDTH / 25,
    minWidth: 12,
    zIndex: 1,
  },
  cartText: {
    alignSelf: 'center',
    fontSize: 8,
    margin: 1,
    fontWeight: 'bold',
    color: 'white',
  },
  safeContainer: {
    flex: 1,
    color: '#2B4F8C',
  },
});
