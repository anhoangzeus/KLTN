import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  texthead: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: width / 20,
  },
  headconteiner: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  star: {
    height: height / 20,
    flexDirection: 'row',
  },
  numstar: {
    marginLeft: width / 12,
    color: '#a2459a',
    fontWeight: 'bold',
  },
});
