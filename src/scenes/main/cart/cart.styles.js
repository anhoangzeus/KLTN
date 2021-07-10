import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainersafe: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  btnChange: {
    backgroundColor: 'green',
    padding: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 4,
    backgroundColor: '#2B4F8C',
  },
  headerText: {
    color: 'white',
    textAlignVertical: 'center',
    marginLeft: width * 0.23,
    fontSize: 20,
  },
  itemcard: {
    backgroundColor: '#fff',
    width: '100%',
    minHeight: height * 0.25,
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: '#666666',
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    width: '100%',
    borderBottomWidth: 5,
    borderTopWidth: 5,
    marginTop: 5,
    borderColor: '#2B4F8C',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'silver',
  },
  itemGift: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  itemImage: {
    width: width / 4,
    height: height / 6,
    resizeMode: 'contain',
  },
  itemInfo: {
    flexDirection: 'row',
    marginTop: height / 35,
    marginLeft: 5,
  },

  itemName: {
    fontSize: 16,
    color: '#484848',
    marginVertical: 4,
    fontWeight: 'bold',
  },
  itemDec: {
    marginLeft: width / 20,
    marginRight: 20,
    width: width * 0.45,
  },
  buttonUpDown: {
    width: width / 11,
    height: height / 20,
    backgroundColor: '#2B4F8C',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnSubmit: {
    width: width * 0.9,
    height: height / 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  address: {
    marginTop: 5,
    fontSize: height / 55,
  },
  addresstitle: {
    fontWeight: 'bold',
    fontSize: height / 50,
    color: '#000',
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
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: '#2196F3',
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
    color: '#2B4F8C',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cartItem: {
    paddingLeft: 10,
    paddingTop: 5,
    flexDirection: 'row',
  },
  txtReceice: {
    marginLeft: 5,
    color: 'green',
    fontSize: 18,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtCreatOrder: {
    color: '#2B4F8C',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtPromotion: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#fff',
  },
  txtMoneyTotal: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
  },
  TotalContainer: {
    backgroundColor: '#2B4F8C',
    marginBottom: 5,
    paddingVertical: 10,
  },
  txtPrice: {
    marginVertical: 4,
    fontSize: 19,
    color: 'black',
  },
  btnGiamTang: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtCount: {
    fontSize: 20,
    marginHorizontal: 20,
    color: '#000',
  },
  margin10: {
    marginTop: 10,
  },
  openButtonKeep: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: width / 2.5,
  },
  openButtonDelete: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: width / 2.5,
    backgroundColor: '#2196F3',
    marginLeft: 5,
  },
  btnRemoveItem: {
    marginLeft: width / 15,
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  imageView: {
    height: height / 1.8,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 5,
    width: width,
  },
  img: {
    height: width / 3,
    width: width / 3,
    alignSelf: 'center',
  },
  txtEmpty: {
    textAlign: 'center',
    color: '#2B4F8C',
    fontSize: 20,
  },
  btnBackHome: {
    backgroundColor: '#2B4F8C',
    margin: 20,
    borderRadius: 20,
    height: height / 18,
    justifyContent: 'center',
  },
  txtBuy: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
