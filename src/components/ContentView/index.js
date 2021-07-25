import React, {Component} from 'react';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native';
import Header from 'components/Header';
const {width} = Dimensions.get('screen');
export default function Route_ContentViews({route}) {
  var searchContent = '';
  if (route.params != null) {
    searchContent = route.params.id;
  }
  return <ContentViews content={searchContent} />;
}

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  texthead: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: width / 20,
  },
  headconteiner: {
    flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
  },
  btnBack: {
    width: 60,
    borderRadius: 10,
  },
  margin: {
    marginTop: 20,
  },
});

export class ContentViews extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.containner}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={'Thông tin chi tiết'} type={true} />
        <WebView
          source={{
            uri: this.props.content,
          }}
          style={styles.margin}
        />
      </SafeAreaView>
    );
  }
}
