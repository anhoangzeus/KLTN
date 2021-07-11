import {StyleSheet} from 'react-native';
import {normalize} from 'react-native-elements';
//import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/';

export default StyleSheet.create({
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
    borderRadius: 16,
    marginTop: 16,
  },
  title: {
    fontSize: normalize(14),
    color: '#949494',
  },
});
