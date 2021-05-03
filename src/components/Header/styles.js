import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';
export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
});
