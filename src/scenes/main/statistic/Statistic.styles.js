import {StyleSheet, Dimensions} from 'react-native';
import {normalize} from 'react-native-elements';
//import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/';
const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  vHeader: {
    flexDirection: 'row',
    //paddingTop: normalize(30),
    paddingLeft: normalize(5),
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: normalize(3),
  },
  vBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scroll: {
    backgroundColor: '#fff',
  },
  txtTitle: {
    color: 'black',
    fontSize: normalize(16),
    fontWeight: '600',
    marginLeft: -normalize(30),
    // fontFamily:'Noto Sans KR',
  },
  vTitleContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  line: {
    backgroundColor: '#E8E8E8',
  },
  chartMain: {
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: normalize(14),
    color: '#949494',
    marginLeft: 7,
    marginTop: 7,
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
  con: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
