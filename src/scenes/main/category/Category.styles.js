import { StyleSheet, Dimensions } from 'react-native';
import SIZE from 'constants/size';
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
  viewRow: {
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: '#2B4F8C',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: SIZE.DEVICE_HEIGHT / 50,
    paddingHorizontal: 12,
    borderRadius: 2,
    height: SIZE.DEVICE_HEIGHT / 10,
    width: SIZE.DEVICE_WIDTH * 0.8,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  cartContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: 75,
    borderRadius: 15,
    paddingTop: 5,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollCate1: {
    height: height / 12,
    flexDirection: 'row',
  },
  itemContainer: {
    alignItems: 'center',
    width: width / 2,
    height: height / 3.62,
    margin: -0.2,
    borderColor: '#2B4F8C',
    borderWidth: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 150,
    height: 150,
    marginTop: 5,
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  cateImage: {
    marginVertical: 5,
    width: width / 6.5,
    height: height / 20,
    resizeMode: 'contain',
  },
  cate: {
    margin: 5,
    width: width / 3,
    height: height / 10,
    resizeMode: 'center',
  },
  cate1: {
    margin: 5,
    width: width / 4.25,
    height: height / 12,
    resizeMode: 'center',
  },
  button1: {
    borderColor: '#1ba8ff',
    borderLeftWidth: 5,
  },
  sectionImage: {
    width: width - 24,
    height: height / 4.5,
    borderRadius: 10,
    resizeMode: 'center',
    margin: 10,
  },
  textnum: {
    fontSize: 15,
    color: '#1ba8ff',
  },
  greenText: {
    color: 'green',
  },
  itemImage1: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  reviewimg: {
    height: height / 50,
    marginLeft: width / 60,
  },
  branditemContainer: {
    marginHorizontal: 5,
    borderStyle: 'solid',
    width: width / 4.5,
    height: height / 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 70,
    borderColor: '#2B4F8C',
  },
  cateIcon: {
    marginHorizontal: 14,
    borderRadius: 30,
    marginVertical: 5,
    marginLeft: width / 40,
    alignSelf: 'center',
  },
  ContainerEmpty: {
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    height: 20,
    backgroundColor: '#fff',
  },
  whiteBackground: {
    backgroundColor: '#fff',
  },
  productBackground: {
    height: 2,
    backgroundColor: '#2B4F8C',
  },
  loadingView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imageLoading: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
  space: {
    height: 5,
    backgroundColor: '#2B4F8C',
  },
  ViewImage: {
    width: width / 7,
    height: height / 15,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  ImageBack: {
    width: width / 7,
    height: height / 16.1,
    marginVertical: 5,
    justifyContent: 'center',
  },
  textSelect: (colorText) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    color: colorText,
  }),
  cartView: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    marginLeft: width / 30,
    width: width / 20,
  },
  cartText: {
    alignSelf: 'center',
    fontSize: 10,
    margin: 1,
    fontWeight: 'bold',
    color: 'white',
  },
  productNull: {
    fontSize: 20,
    color: '#1ba8ff',
  },
  squareImage: {
    width: 50,
    height: 50,
  },
});
