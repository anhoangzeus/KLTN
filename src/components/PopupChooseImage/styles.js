import {StyleSheet, Dimensions} from 'react-native';
import {normalize} from 'react-native-elements';
const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2B4F8C',
    height: normalize(40),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 8,
    width: width,
  },
  title: {
    color: 'white',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  mainContainer: {padding: 5, width: width},
  btnChoose: {
    width: '100%',
    paddingVertical: 10,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
  },
});
