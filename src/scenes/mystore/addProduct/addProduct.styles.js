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
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 5,
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
    //height: height / 2.5,
  },
  imgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height / 5,
  },
  whiteText: {
    color: '#2B4F8C',
    fontSize: height / 40,
  },
  textContainer: {
    flex: 2,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'black',
    fontSize: 15,
    height: height / 15,
    marginTop: height / 100,
    marginLeft: 5,
    padding: height / 100,
    borderBottomWidth: 1,
    borderColor: '#6Ec0B6',
    borderWidth: 1,
    borderRadius: 5,
    width: '95%',
    paddingHorizontal: 8,
  },
  elementText: {
    color: 'black',
    fontSize: height / 50,
    marginTop: 10,
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
    color: '#2B4F8C',
    fontSize: height / 40,
    marginTop: height / 150,
    marginLeft: 5,
  },
  subText: {
    fontSize: height / 50,
    color: '#ededed',
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
    color: 'green',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  picker: {
    height: 40,
    width: width,
    marginLeft: width / 20,
    fontSize: 17,
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
    fontSize: 17,
    flex: 1,
    alignSelf: 'flex-end',
  },
  cardText: {
    fontSize: height / 40,
    textAlign: 'right',
    borderColor: '#ededed',
    width: width / 2,
    height: height / 20,
    backgroundColor: '#fff',
    padding: height / 200,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  selectText: {
    color: '#1e1e1e',
    fontSize: 17,
  },
  cardOption: {
    height: height / 14,
    width: width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  unit: {
    marginRight: width / 20,
    fontSize: 18,
    //marginTop: -height / 400,
    color: 'gray',
  },
});
