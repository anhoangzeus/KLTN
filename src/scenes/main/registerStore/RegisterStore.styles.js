import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  subcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepImg: {
    height: height / 15,
    width: width / 2,
    resizeMode: 'stretch',
  },
  logoimg: {
    height: height / 3,
    width: width / 1.5,
    resizeMode: 'stretch',
  },
  infoView: {
    width: width,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ChangeStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: width * 0.05,
    fontSize: height / 50,
    marginTop: height / 50,
  },
  nameInput: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: width * 0.9,
    height: height / 15,
    borderColor: '#6Ec0B6',
    marginLeft: width * 0.05,
    marginTop: height / 100,
  },
  btnthem: {
    alignSelf: 'flex-start',
    backgroundColor: '#6Ec0B6',
    height: height / 20,
    width: width / 4,
    borderRadius: height / 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themAdd: {
    color: '#fff',
  },
  pre: {
    height: height / 20,
    width: width / 4,
    backgroundColor: '#2B4F8C',
    marginBottom: height / 50,
    borderRadius: height / 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    height: height / 20,
    width: width / 4,
    backgroundColor: '#2B4F8C',
    marginBottom: height / 50,
    borderRadius: height / 50,
    marginLeft: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    marginTop: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  totalContainer1: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: '#000',
    fontSize: height / 40,
  },
  totalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'black',
    fontSize: height / 40,
    width: width,
    borderBottomWidth: 2,
    borderBottomColor: '#6Ec0B6',
  },
  divider: {
    height: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
  errtext: {
    color: 'red',
    fontSize: height / 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'red',
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
  ModalContainer: {
    height: height / 2,
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
    color: '#6Ec0B6',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  picker: {
    height: 40,
    width: width,
  },
  pickerView: {
    height: height / 20,
    justifyContent: 'center',
    borderColor: '#6Ec0B6',
    borderWidth: 2,
    borderRadius: height / 50,
  },
  picker1: {
    height: height / 20,
    width: width / 2,
  },
  marTen: {marginLeft: 10},
  marHori: {marginHorizontal: 10},
  greenText: {color: '#6Ec0B6', fontSize: 20},
  btnSubmit: {
    backgroundColor: '#6Ec0B6',
    alignSelf: 'center',
    height: height / 20,
    width: width / 2,
    marginTop: height / 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subBtnText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
  listItem: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    width: width,
    height: height / 7,
  },
  address: {
    width: width * 0.8,
  },
  legacy: {width: width * 0.8, marginLeft: width * 0.1},
});
