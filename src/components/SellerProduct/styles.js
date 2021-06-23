import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';
import {normalize} from 'react-native-elements';

export default StyleSheet.create({
  itemContainer: {
    width: SIZE.DEVICE_WIDTH / 4,
    height: SIZE.DEVICE_HEIGHT / 2.75,
    borderColor: '#fff',
    borderWidth: 2,
    padding: normalize(5),
    marginLeft: SIZE.DEVICE_WIDTH / 20,
  },
  itemImage: {
    width: SIZE.DEVICE_WIDTH / 3.5,
    height: SIZE.DEVICE_HEIGHT / 3.5,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: SIZE.DEVICE_HEIGHT / 50,
    color: 'black',
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
