/* eslint-disable react-native/no-inline-styles */

import SCENE_NAMES from 'constants/sceneName';
import size from 'constants/size';
import moment from 'moment';
import * as React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import styles from './chat.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  listChatView = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, {
            id: item.id,
            Name: item.Name,
          });
        }}
        style={styles.itemMessView}>
        <View>
          <Image source={{uri: item.Avatar}} style={styles.avatar} />
          {item.Status > 0 && (
            <View style={styles.redPoint}>
              <Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>
                {item.Status}
              </Text>
            </View>
          )}
        </View>
        <View style={{}}>
          <Text style={styles.textName}>{item.Name}</Text>
          {item.LastMess ? (
            <Text
              numberOfLines={1}
              style={{width: size.DEVICE_WIDTH / 2, color: '#666666'}}>
              {item.LastMess}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              style={{width: size.DEVICE_WIDTH / 2, color: '#666666'}}>
              [Hình ảnh]
            </Text>
          )}
        </View>
        <Text style={styles.textTime}>
          {moment.unix(item.LastMessTime).format('hh:mm MM-DD-YY')}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {filterChat, filterListchat} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#2B4F8C'}}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.MAIN);
              }}
              style={styles.cartContainer}>
              <FontAwesome
                name="angle-left"
                size={30}
                color="#fff"
                style={styles.maginIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Chat</Text>
            <View style={styles.cartContainer} />
          </View>
          <TextInput
            style={styles.searchView}
            placeholder={I18n.t(`${NAMESPACE}.find`)}
            onChangeText={(val) => {
              filterListchat(val);
            }}
            leftIcon={{type: 'font-awesome', name: 'comment'}}>
            {/* <Icon name="search1" size={20} color="#000" />{' '} */}
          </TextInput>
          <FlatList
            data={filterChat}
            renderItem={({item}) => <this.listChatView item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default ChatContainer;
