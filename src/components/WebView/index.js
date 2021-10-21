import React, {Component} from 'react';

import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';

import database from '@react-native-firebase/database';
import {normalize} from 'react-native-elements';
import Header from 'components/Header';
const {width} = Dimensions.get('screen');
export default function Route_Contents({route}) {
  var searchContent = '';
  if (route.params != null) {
    searchContent = route.params.id;
  }
  return <Contents content={searchContent} />;
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
    padding: 5,
    paddingBottom: normalize(0),
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

export class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }
  componentDidMount() {
    database()
      .ref('Announces')
      .child(`${this.props.content}`)
      .once('value')
      .then((snapshot) => {
        this.setState({items: snapshot.val()});
      });
  }
  render() {
    return (
      <View style={styles.containner}>
        <StatusBar barStyle="light-content" />
        <Header title={'Thông tin chi tiết'} type={true} />
        <WebView
          source={{
            html: this.state.items?.Url,
          }}
          style={styles.margin}
        />
      </View>
    );
  }
}
