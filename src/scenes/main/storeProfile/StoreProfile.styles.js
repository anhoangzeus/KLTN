import size from 'constants/size';
import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: height,
    backgroundColor: '#ededed',
  },
  back: {marginTop: height / 40},
  imgBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  SafeSreen: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height / 50,
  },
  flexRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height / 15,
    //height: height / 10,
  },
  Tag: {
    borderRadius: height / 100,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    height: height / 20,
    width: width * 0.2,
    backgroundColor: '#fff',
    marginLeft: width / 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tagImg: {
    height: height / 25,
    width: height / 25,
    resizeMode: 'center',
  },
  tagImg1: {
    height: height / 25,
    width: width * 0.2,
    marginLeft: 0,
    resizeMode: 'cover',
  },
  tagText: {fontSize: height / 60},
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: size.DEVICE_HEIGHT / 7,
    marginTop: height / 50,
  },
  nameText: {
    color: '#fff',
    fontSize: height / 40,
    fontWeight: 'bold',
  },
  tabText: {
    color: '#fff',
    fontSize: height / 40,
    fontWeight: '600',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cartContainer: {
    paddingHorizontal: 20,
  },
  touchView: {
    backgroundColor: '#fff',
    width: width / 2,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  divider: {
    height: height / 30,
  },
  divider1: {
    height: 1,
  },
  storeProfile: {
    width: width,
    height: height * 0.625,
    backgroundColor: '#fff',
  },
  lineTab: {
    justifyContent: 'center',

    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: height / 5,
    width: width * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-around',
  },
  rpText: {
    color: '#FF0303',
    fontSize: 14,
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnSelect: {
    color: '#949494',
  },
  btnSelect2: {
    color: '#2B4F8C',
  },
  itemTouch: {
    backgroundColor: '#fff',
  },
  desText: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 15,
  },
  grayView: {
    backgroundColor: '#FFFAFA',
    height: height / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxView: {
    flexDirection: 'row',
  },
  boxContainer: {
    width: width / 2,
    //height: height / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perText: {
    fontSize: 22,
    color: '#009900',
  },
  div: {
    height: 8,
    backgroundColor: '#ededed',
  },
  whiteView: {
    backgroundColor: '#fff',
    height: height / 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
});
