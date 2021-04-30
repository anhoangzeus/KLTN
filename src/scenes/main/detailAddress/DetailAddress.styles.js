import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  screenContainer2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
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
    width: 75,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titletext: {
    color: 'black',
    fontSize: height / 40,
  },
  errtext: {
    color: 'red',
    fontSize: height / 40,
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
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  picker: {
    height: 40,
    width: width,
  },
  picker1: {
    height: 40,
    width: width / 2,
  },
  marTen: {marginLeft: 10},
  marHori: {marginHorizontal: 10},
  greenText: {color: 'green', fontSize: 20},
  btnSubmit: {
    backgroundColor: '#FF3333',
    marginHorizontal: 10,
    marginVertical: 10,
    height: height / 20,
    borderRadius: 15,
  },
  subBtnText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
});
