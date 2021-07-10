// @flow

import {StyleSheet, Dimensions} from 'react-native';
import {normalize} from 'react-native-elements';
//import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/';
const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  checkPoint: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    //borderColor: Colors.white,
    marginRight: normalize(10),
  },
  viewStyle: {
    margin: normalize(20),
  },
  textStyle: {
    //marginTop: normalize(20),
    marginBottom: 40,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  vcheckPoint: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 1,
    //borderColor: Colors.basic,
    marginLeft: 5,
    marginRight: normalize(10),
  },
  text: {
    fontWeight: '400',
    // fontSize: Fonts.size.regular,
    // color: Colors.gray1,
  },
  rowGender: {
    flexDirection: 'row',
    paddingEnd: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  textGender: {
    // ...ApplicationStyles.textContent,
    // color: 'black'
    color: '#585858',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 10,
  },
  other_remark: {
    fontWeight: '400',
    // fontSize: Fonts.size.medium,
    // color: Colors.basic,
    borderBottomWidth: 1,
    borderBottomColor: '#999999',
    marginHorizontal: normalize(30),
    marginTop: normalize(10),
    paddingHorizontal: normalize(10),
    paddingVertical: 0,
  },
  vLeftIcon: {
    color: '#fff',
  },
  vHeader: {
    flexDirection: 'row',
    paddingTop: normalize(30),
    paddingLeft: normalize(10),
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: normalize(3),
  },
  vBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
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
  styleButton: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    // backgroundColor:'red',
  },
  buttonContainer: {
    height: normalize(30),
    backgroundColor: '#2B4F8C',

    width: '100%',
    // alignSelf: "center",
    justifyContent: 'center',
    // alignContent:'center',
    // alignItems:'center',a
  },
  buttonText: {
    fontSize: normalize(16),
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    flex: 1,
  },
  styleView: {
    // backgroundColor: Colors.text,
    height: 68,
    flexDirection: 'row',
    width: 310,
    // alignSelf: "center",
    borderRadius: 4,

    // alignContent: "center",
    // flex:0.5,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: height / 5,
    width: width * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
  },
  rpText: {
    color: '#FF0303',
    fontSize: 20,
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnSelect: {
    color: '#949494',
  },
  btnSelect2: {
    color: '#2B4F8C',
  },
});
