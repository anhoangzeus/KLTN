import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';
import {normalize} from 'react-native-elements';

export default StyleSheet.create({
  itemContainer: {
    width: SIZE.DEVICE_WIDTH * 0.95,
    marginLeft: SIZE.DEVICE_WIDTH * 0.025,
    height: SIZE.DEVICE_HEIGHT / 3.5,
    borderColor: 'gray',
    borderWidth: 2,
    padding: normalize(5),
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
  },
  itemImage: {
    width: SIZE.DEVICE_WIDTH / 2.5,
    height: SIZE.DEVICE_HEIGHT / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 14,
    color: 'black',
    marginHorizontal: 10,
    fontWeight: '100',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 10,
  },
  priceColor: {
    color: 'red',
    marginHorizontal: 10,
  },
  starView: {
    marginLeft: 8,
  },
  boughColor: {
    color: 'green',
  },
  desColor: {
    color: '#2B4F8C',
    marginHorizontal: 10,
    width: SIZE.DEVICE_WIDTH * 0.4,
  },
  desText: {
    width: SIZE.DEVICE_WIDTH / 2.5,
    marginHorizontal: 10,
  },
});
