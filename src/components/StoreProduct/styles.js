import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';
import {normalize} from 'react-native-elements';

export default StyleSheet.create({
  itemContainer: {
    borderColor: '#ededed',
    borderWidth: 2,
    padding: normalize(5),
    flexDirection: 'row',
    borderRadius: 10,
    flex: 1,
  },
  imgBackground: {
    width: SIZE.DEVICE_WIDTH * 0.95,
    marginLeft: SIZE.DEVICE_WIDTH * 0.025,
    height: SIZE.DEVICE_HEIGHT / 3.5,
    resizeMode: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: SIZE.DEVICE_WIDTH / 2.5,
    height: SIZE.DEVICE_HEIGHT / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  del: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  itemName: {
    fontSize: SIZE.DEVICE_HEIGHT / 40,
    color: 'black',
    marginHorizontal: 10,
    fontWeight: '200',
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
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    width: SIZE.DEVICE_WIDTH * 0.9,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: '#2196F3',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openButtonKeep: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: SIZE.DEVICE_WIDTH / 2.5,
  },
  openButtonDelete: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: SIZE.DEVICE_WIDTH / 2.5,
    backgroundColor: 'red',
    marginLeft: 5,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
