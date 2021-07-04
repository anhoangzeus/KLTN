import size from 'constants/size';
import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: height,
    backgroundColor: '#ededed',
  },
  back: { marginTop: height / 50, marginLeft: 5 },
  imgBackground: {
    // width: width,
    //height: height,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  SafeSreen: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexRow: { flexDirection: 'row', justifyContent: 'space-evenly' },
  Tag: {
    borderRadius: height / 100,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    height: height / 12,
    width: width * 0.45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tagImg: {
    height: height / 20,
    width: height / 20,
    borderRadius: height / 100,
  },
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
  },
  nameText: {
    color: '#fff',
    fontSize: height / 40,
    fontWeight: 'bold',
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
});
