/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */

import moment from 'moment';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationServices from 'utils/navigationServices';
import styles from './chatBox.styles';
// import SCENE_NAMES from 'constants/sceneName';

const {width, height} = Dimensions.get('screen');

class ChatBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onInputChat: false,
    };
  }

  chatMessage = ({item}) => {
    //console.log('gia tri image: ', item.Image);
    return item.Type === 'CUS' ? (
      <View style={{flexDirection: 'row'}}>
        {item.Image === '' || item.Image === undefined ? (
          <View style={styles.messageView}>
            <Text style={styles.messText}>{item.Text}</Text>
          </View>
        ) : (
          <Image source={{uri: item.Image}} style={styles.msgImage} />
        )}

        <Text style={{...styles.messTime, marginLeft: normalize(15)}}>
          {moment.unix(item.CreatedTime).format('hh:mm MM-DD-YY')}
        </Text>
      </View>
    ) : (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={{...styles.messTime, marginRight: normalize(15)}}>
          {moment.unix(item.CreatedTime).format('hh:mm MM-DD-YY')}
        </Text>

        {item.Image === '' || item.Image === undefined ? (
          <View style={{...styles.messageView, backgroundColor: '#0084ff'}}>
            <Text style={styles.text}>{item.Text}</Text>
          </View>
        ) : (
          <Image source={{uri: item.Image}} style={styles.msgImage} />
        )}
      </View>
    );
  };
  render() {
    const {
      Name,
      listchat,
      textchat,
      onChangeText,
      sentMessage,
      openGalary,
      //loading,
    } = this.props;
    const {onInputChat} = this.state;

    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2B4F8C'}}>
          <KeyboardAvoidingView
            style={{height: height * 0.91}}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => {
                  NavigationServices.goBack();
                }}
                style={styles.cartContainer}>
                <FontAwesome
                  name="angle-left"
                  size={30}
                  color="#fff"
                  style={styles.maginIcon}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>{Name}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <MaterialIcons
                    name="call"
                    size={25}
                    color="#fff"
                    style={styles.iconimg}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons
                    name="videocam"
                    size={25}
                    color="#fff"
                    style={styles.iconimg}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="md-ellipsis-vertical"
                    size={25}
                    color="#fff"
                    style={styles.iconimg}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={listchat}
                renderItem={({item}) => <this.chatMessage item={item} />}
                keyExtractor={(item) => item.id}
                ListFooterComponent={<View style={{height: normalize(30)}} />}
              />
            </View>
            <View
              style={{
                ...styles.containerComposize,
                height: onInputChat ? width * 0.24 : height * 0.07,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => openGalary()}>
                  <Image
                    source={require('../../../assets/images/ic_sendmess.png')}
                    style={styles.iconsend}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.vChat}
                  placeholder={'Soạn tin...'}
                  placeholderTextColor={'#000'}
                  multiline={true}
                  value={textchat}
                  onChangeText={(val) => {
                    onChangeText(val);
                  }}
                />
                <TouchableOpacity onPress={() => sentMessage()}>
                  <Image
                    source={require('../../../assets/images/ic_sendmess.png')}
                    style={styles.iconsend}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2B4F8C'}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.goBack();
              }}
              style={styles.cartContainer}>
              <FontAwesome
                name="angle-left"
                size={30}
                color="#fff"
                style={styles.maginIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>{Name}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <MaterialIcons
                  name="call"
                  size={25}
                  color="#fff"
                  style={styles.iconimg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="videocam"
                  size={25}
                  color="#fff"
                  style={styles.iconimg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="md-ellipsis-vertical"
                  size={25}
                  color="#fff"
                  style={styles.iconimg}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <FlatList
              ref="flatList"
              showsVerticalScrollIndicator={false}
              data={listchat}
              renderItem={({item}) => <this.chatMessage item={item} />}
              keyExtractor={(item) => item.id}
              ListFooterComponent={<View style={{height: normalize(30)}} />}
              onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
            />
          </View>
          <View
            style={{
              ...styles.containerComposize,
              height: onInputChat ? width * 0.24 : height * 0.07,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => openGalary()}>
                <Image
                  source={require('../../../assets/images/gallery.png')}
                  style={styles.iconUp}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.vChat}
                placeholder={'Soạn tin...'}
                placeholderTextColor={'#000'}
                multiline={true}
                value={textchat}
                onChangeText={(val) => {
                  onChangeText(val);
                }}
                onFocus={() => {
                  this.refs.flatList.scrollToEnd();
                }}
                onBlur={() => {
                  this.refs.flatList.scrollToEnd();
                }}
              />
              <TouchableOpacity onPress={() => sentMessage()}>
                <Image
                  source={require('../../../assets/images/ic_sendmess.png')}
                  style={styles.iconsend}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}
export default ChatBoxContainer;
