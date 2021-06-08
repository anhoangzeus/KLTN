import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';
import {normalize} from 'react-native-elements';

export default StyleSheet.create({
  itemContainer: {
    width: SIZE.DEVICE_WIDTH / 2,
    height: SIZE.DEVICE_HEIGHT / 2.3,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    padding: normalize(5),
  },
  itemImage: {
    width: SIZE.DEVICE_WIDTH / 2.5,
    height: SIZE.DEVICE_HEIGHT / 3.5,
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
    fontWeight: '600',
    color: 'black',
    marginHorizontal: 10,
  },
  priceColor: {
    color: 'white',
    fontSize: 12,
  },
  saleView: {
    backgroundColor: '#FF3030',
    height: 15,
    borderRadius: 4,
  },
  starView: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  boughColor: {
    color: 'green',
  },
});
