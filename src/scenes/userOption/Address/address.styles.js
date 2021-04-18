import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#a2459a',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#a2459a',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
    width: 72,
    borderRadius: 15,
  },
  headerText: {
    color: '#fff',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titletext: {
    color: 'green',
    fontSize: 20,
    marginLeft: 20,
  },
  listItem: {
    margin: 10,
    backgroundColor: '#fff',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  address: {
    marginLeft: 10,
    fontSize: 25,
    color: '#000',
  },
  buttonXem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00FF',
  },
  textContainer: {
    backgroundColor: 'green',
    width: 250,
    borderRadius: 5,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    padding: SIZE.DEVICE_WIDTH / 15,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: SIZE.DEVICE_WIDTH / 2.5,
  },
  openButtonLeft: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: SIZE.DEVICE_WIDTH / 2.5,
    marginLeft: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: '#2196F3',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#a2459a',
  },
  row: {
    flexDirection: 'row',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  txtAddnew: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  txtAddnew1: {
    fontSize: 20,
    color: '#1ba8ff',
  },
  nullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    margin: 10,
  },
  listView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  btnAdd: {
    height: SIZE.DEVICE_WIDTH / 10,
    width: SIZE.DEVICE_WIDTH / 3.3,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnDel: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  marginHeader: {
    marginLeft: SIZE.DEVICE_WIDTH / 40,
  },
});
