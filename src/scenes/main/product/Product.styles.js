import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  safeView: {flex: 1, backgroundColor: '#2B4F8C'},
  setTouchableBack: {
    width: 50,
    height: 30,
    backgroundColor: '#2B4F8C',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 5,
    justifyContent: 'center',
    marginTop: 10,
  },
  settingTouchSearch: {
    width: 50,
    height: 30,
    backgroundColor: '#2B4F8C',
    borderRadius: 25,
    marginLeft: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  settingTouch: {
    width: 50,
    height: 30,
    backgroundColor: '#2B4F8C',
    borderRadius: 25,
    marginLeft: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textName: {
    paddingBottom: 8,
    fontSize: 18,
    marginLeft: width / 40,
    color: 'black',
  },
  textGreen: {
    color: 'green',
  },
  textGreen2: {
    color: 'green',
    marginLeft: 10,
  },
  metaView: {
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: width / 40,
    color: '#000',
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 24,
    marginLeft: width / 40,
    color: 'black',
    fontWeight: 'bold',
  },
  promotionText: {
    textDecorationLine: 'line-through',
    fontSize: 15,
    marginLeft: 15,
    color: '#696969',
  },
  warantyText: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: width / 40,
  },
  relateView: { backgroundColor: '#fff' },
  headerFont: {
    flexDirection: 'row',
    position: 'absolute',
    width: width,
  },
  quarView: { height: 25 },
  relateText: {
    marginVertical: 10,
    marginLeft: width / 40,
    fontWeight: 'bold',
    color: '#000',
  },
  clientView: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  clientText: {
    marginLeft: width / 40,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAll: {color: '#2B4F8C', marginRight: width / 40},
  headerFont1: {
    flexDirection: 'row',
    paddingTop: height / 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: width,
  },
  devide: {
    height: 2,
  },
  whiteView: { backgroundColor: '#fff' },
  profileImage: {
    width: width,
    height: height / 2,
    resizeMode: 'contain',
  },
  fiveView: { height: 15 },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  desText: {
    marginVertical: 10,
    marginLeft: width / 40,
    fontWeight: 'bold',
    color: '#000',
  },
  mainText: {
    marginHorizontal: width / 40,
    color: '#000',
    textAlign: 'justify',
  },
  options: {
    position: 'relative',
    paddingTop: -5,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  itemContainer: {
    width: width / 3.5,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage1: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  cartposition: {
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: 'red',
    height: 15,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width / 11,
    marginTop: height / 70,
  },
  btnmua: {
    width: width / 1.1,
    backgroundColor: '#2B4F8C',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: height / 4,
    width: width / 1.1,
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
    fontSize: 22,
    color: '#2B4F8C',
  },
  star: {
    height: height / 20,
    flexDirection: 'row',
  },
  rowView: { flexDirection: 'row' },
  flatstyle: { marginHorizontal: 10 },
  ratingView: {
    flexDirection: 'column',
    marginHorizontal: width / 6,
    marginVertical: height / 30,
  },
  ratingText: { fontSize: 50, color: '#000' },
  commentText: { fontSize: 15, color: 'green', marginTop: 5 },
  startView: { width: 1, backgroundColor: '#DDDDDD' },
  marginView: { marginLeft: 5 },
  starUI: {
    marginLeft: width / 12,
    color: '#2B4F8C',
    fontWeight: 'bold',
  },
  modalButton: { width: width / 15, borderRadius: 10 },
  modalImage: {
    height: height / 8,
    width: width / 5,
    resizeMode: 'contain',
  },
  byView: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10,
  },
  modalnameText: { color: '#000', width: width / 1.8 },
  byText: {
    color: '#000',
    width: width / 1.5,
  },
  cartButton: {
    backgroundColor: '#2B4F8C',
    width: width / 1.2,
    height: height / 17,
    borderRadius: 15,
    justifyContent: 'center',
  },
  cartView: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  buyView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: height / 16,
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontSize: 20 },
  valueText: { marginLeft: 5, color: 'red' },
  starratingView: { flexDirection: 'row', marginLeft: 10 },
});
