import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  ratingView: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  blackText: {color: '#000', marginLeft: 5},
  marginView: {marginLeft: 10},
  sourceImage: {width: 50, height: 50, borderRadius: 25, marginVertical: 5},
  commentView: {
    backgroundColor: '#DDDDDD',
    height: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  flexDir: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
