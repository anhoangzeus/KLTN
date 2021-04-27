import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  screenContainersafe: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  camera: {
    width: 20,
    height: 20,
    marginTop: 55,
    marginLeft: 60,
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userContainer1: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  totalContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE.DEVICE_HEIGHT / 7,
    flexDirection: 'row',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#a2459a',
    position: 'absolute',
  },
  totalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#EEEEEE',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'black',
    fontSize: 15,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: SIZE.DEVICE_WIDTH / 2,
  },
  errtext: {
    color: 'black',
    fontSize: 15,
  },
  emailtext: {
    color: 'gray',
    fontSize: 15,
  },
  divider: {
    height: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titletext: {
    color: 'black',
    fontSize: 20,
  },
  // eslint-disable-next-line no-dupe-keys
  errtext: {
    color: 'black',
    fontSize: 20,
  },
  errtext1: {
    color: 'red',
    fontSize: 15,
  },
  textorder: {
    fontSize: 20,
    paddingLeft: 10,
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
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#2B4F8C',
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
  btnSave: {
    justifyContent: 'flex-end',
    height: SIZE.DEVICE_HEIGHT / 12,
    backgroundColor: '#fff',
  },
  btnTouch: {
    backgroundColor: '#a2459a',
    marginHorizontal: 10,
    marginVertical: 10,
    height: SIZE.DEVICE_HEIGHT / 20,
    borderRadius: 10,
  },
  txtSave: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
  magin10: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  decide: {
    height: 2,
    backgroundColor: 'red',
  },
  btnConfirmPhone: {
    width: SIZE.DEVICE_WIDTH / 3,
    height: 60,
  },
  txtConfirmPhone: {
    fontSize: 15,
    color: 'blue',
    marginEnd: 10,
  },
  maginIcon: {
    marginLeft: SIZE.DEVICE_WIDTH / 40,
  },
});
