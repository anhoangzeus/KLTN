import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  safeContainer: {
    backgroundColor: '#2B4F8C',
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  totalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 4,
    marginBottom: 2,
    borderColor: 'red',
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'black',
  },
  divider: {
    height: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
    width: 70,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titletext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  titletext1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  textorder: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingLeft: 10,
    color: '#1e88e5',
  },
  sectionImage: {
    width: SIZE.DEVICE_WIDTH / 4,
    height: SIZE.DEVICE_HEIGHT / 8,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  titletext2: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
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
  modalView1: {
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
    width: SIZE.DEVICE_WIDTH,
    height: SIZE.DEVICE_HEIGHT / 4,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: '#2196F3',
    textAlign: 'center',
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
});
