import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SCENE_NAMES from 'constants/sceneName';

const {width} = Dimensions.get('screen');
export default function Route_Contents({route, navigation}) {
  var searchContent = '';
  if (route.params != null) {
    searchContent = route.params.id;
  }
  return <Contents content={searchContent} navigation={navigation} />;
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
    paddingHorizontal: 5,
    paddingTop: 15,
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
  }
  render() {
    return (
      <View style={styles.containner}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headconteiner}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => this.props.navigation.navigate(SCENE_NAMES.MAIN)}>
            <FontAwesome
              name="angle-left"
              size={30}
              color="#fff"
              style={{marginLeft: width / 40}}
            />
          </TouchableOpacity>
          <Text style={styles.texthead}>Thông tin chi tiết</Text>
        </View>
        <WebView
          source={{
            uri: this.props.content,
          }}
          style={styles.margin}
        />
      </View>
    );
  }
}
