import size from 'constants/size';
import {StyleSheet, Dimensions} from 'react-native';
const {height} = Dimensions.get('screen');
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: height,
    backgroundColor: '#fff',
  },
  SafeSreen: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    paddingBottom: 12,
  },
  avatarContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: size.DEVICE_HEIGHT / 5,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2B4F8C',
    borderWidth: 1,
  },
  cartContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  divider: {
    height: 10,
  },
  divider1: {
    height: 1,
  },
});
