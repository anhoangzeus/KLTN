import {StyleSheet, Dimensions} from 'react-native';
import {normalize} from 'react-native-elements';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  searchView: {
    height: height * 0.05,
    backgroundColor: '#EEEEEE',
    marginTop: height * 0.01,
    marginHorizontal: width * 0.06,
    borderRadius: 10,
    paddingHorizontal: normalize(10),
    justifyContent: 'center',
    padding: 5,
  },
  maginIcon: {
    marginLeft: -20,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  avatar: {
    height: width * 0.13,
    width: width * 0.13,
    borderRadius: width * 0.1,
  },
  itemMessView: {
    flexDirection: 'row',
    height: height * 0.1,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    padding: normalize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(25),
  },
  textName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  textTime: {
    fontSize: 10,
    color: '#8A8A8E',
    alignSelf: 'flex-start',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: normalize(20),
    marginTop: normalize(20),
  },
  redPoint: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
  },
  cartIcon: {
    width: 24,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
