import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  itemContainer1: {
    width: SIZE.DEVICE_WIDTH / 2.17,
    height: SIZE.DEVICE_HEIGHT * 0.4,
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  itemImage: {
    width: SIZE.DEVICE_WIDTH / 2.5,
    height: SIZE.DEVICE_HEIGHT / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 12,
    color: 'black',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
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
