import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';
import {normalize} from 'react-native-elements';

export default StyleSheet.create({
  itemContainer: {
    width: SIZE.DEVICE_WIDTH / 3,
    height: SIZE.DEVICE_HEIGHT / 3,
    borderColor: '#fff',
    borderWidth: 2,
    padding: normalize(5),
  },
  itemImage: {
    width: SIZE.DEVICE_WIDTH / 2.5,
    height: SIZE.DEVICE_HEIGHT / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: SIZE.DEVICE_HEIGHT / 60,
    color: 'black',
    marginHorizontal: SIZE.DEVICE_HEIGHT / 100,
  },
  itemPrice: {
    fontSize: SIZE.DEVICE_HEIGHT / 50,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 10,
  },
  priceColor: {
    color: 'red',
  },
  starView: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  boughColor: {
    color: 'green',
  },
});
