import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainersafe: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#2B4F8C',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
    height: height / 16,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
    height: height / 16,
    width: width * 0.7,
    padding: height / 125,
  },
  cartContainer: {
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 70,
    paddingTop: 10,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollCate: {
    height: height / 10,
    flexDirection: 'row',
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
  },
  itemImage: {
    width: width / 2.5,
    height: height / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 14,
    color: 'black',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 10,
  },
  reviewimg: {
    height: height / 50,
    marginLeft: width / 60,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
  },
  itemContainer1: {
    width: width / 2.2,
    height: height / 2.8,
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 5,
    marginBottom: 5,
  },
  //
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#242424',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#5a5a5a',
  },
  cateImage: {
    marginTop: 5,
    width: 100,
    height: height / 11,
    resizeMode: 'center',
  },
  viewLoading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartView: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    marginLeft: width / 13,
    width: width / 20,
    marginTop: 5,
  },
  cartText: {
    alignSelf: 'center',
    fontSize: 10,
    margin: 1,
    fontWeight: 'bold',
    color: 'white',
  },
});
