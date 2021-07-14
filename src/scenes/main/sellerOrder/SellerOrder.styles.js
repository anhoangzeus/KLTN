import {StyleSheet} from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    marginTop: 60,
  },
  listItem: {
    margin: 5,
    backgroundColor: '#fff',
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  address: {
    fontWeight: '400',
    marginLeft: 10,
    color: '#000',
  },
  buttonXem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00FF',
  },
  containerNull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: SIZE.DEVICE_HEIGHT / 1.17,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  txtEmpty: {
    fontSize: 20,
    color: '#1ba8ff',
  },
  img: {
    width: 50,
    height: 50,
  },
});
