import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screenContainersafe: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  orderWidth: {
    width: SIZE.DEVICE_WIDTH / 1.3,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  buttonActiveContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  buttonInactiveContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  activeMark: {
    backgroundColor: '#2B4F8C',
    width: 4,
  },
  activeIcon: {
    padding: 12,
    marginLeft: -4,
  },
  listContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e5e5',
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  itemsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  itemTopContainer: {
    flexDirection: 'row',
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
  itemTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTopTextContainer: {
    marginRight: 40,
    marginLeft: 4,
    maxWidth: '90%'
  },
  itemName: {
    color: '#000',
    fontWeight: '500',
  },
  itemDate: {
    color: '#787878',
    fontSize: 12,
    marginTop: 8,
  },
  itemDetail: {
    color: '#787878',
    marginTop: 12,
  },
  textSuccess: {
    color: 'green',
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  lineView: {
    backgroundColor: '#2B4F8C',
    width: 2,
  },
  lineHolder: {
    marginLeft: 10,
  },
  btnDropDown: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: SIZE.DEVICE_HEIGHT / 12,
    width: SIZE.DEVICE_WIDTH / 12,
  },
  dropContainer: {
    backgroundColor: '#ffff',
    paddingHorizontal: 10,
  },
  jContent: {
    justifyContent: 'space-between',
  },
  showdone: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 32,
    marginHorizontal: 10,
  },
  shownew: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  redPoint: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: SIZE.DEVICE_WIDTH / 28,
  },
  indicatorView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  listIndiContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e5e5',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
