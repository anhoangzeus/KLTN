import {StyleSheet} from 'react-native';
// eslint-disable-next-line no-unused-vars
import SIZE from 'constants/size';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
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
    backgroundColor: '#fff',
  },
  userContainer: {
    marginTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: height / 4,
  },
  totalContainer1: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgPro: {
    height: height / 6,
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  imgText: {
    color: '#2B4F8C',
    paddingTop: height / 11,
    fontSize: height / 50,
    marginLeft: width / 10,
  },
  nameView: {
    //justifyContent: 'space-between',
    height: height / 3.5,
  },
  imgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height / 5,
  },
  whiteText: {
    color: '#000',
    fontSize: height / 40,
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
    backgroundColor: '#ededed',
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
    marginTop: height / 40,
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

  btnSubmit: {
    backgroundColor: '#2B4F8C',
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
  itemText: {
    color: '#1e1e1e',
    fontSize: 20,
    flex: 1,
  },
  cardOption: {
    height: height / 15,
    width: width,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
