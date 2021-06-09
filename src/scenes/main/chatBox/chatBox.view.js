/* eslint-disable react-native/no-inline-styles */

import Popup1Button from 'components/Popup1Button';
import PopupChooseImage from 'components/PopupChooseImage';
import SCENE_NAMES from 'constants/sceneName';
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
import { normalize } from 'react-native-elements';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MessType } from 'utils/appContants';
import I18n from 'utils/i18n';
import NavigationServices from 'utils/navigationServices';
import styles from './chatBox.styles';
// import SCENE_NAMES from 'constants/sceneName';
const NAMESPACE = 'common';
const { width, height } = Dimensions.get('screen');

class ChatBoxContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      onInputChat: false,
    };
  }
  renderContent = (item) => {
    const { setviewImagesPop, setvisibleViewing } = this.props;
    if (item.messages_type === MessType.Image) {
      return (
        <TouchableOpacity
          style={styles.btnImgView}
          onPress={() => {
            setviewImagesPop(item.Text);
            setvisibleViewing(true);
          }}>
          <Image
            source={{ uri: item.Text }}
            style={{
              ...styles.imgView,
              width: item.imgWidth || 170,
              height: item.imgHeight || 170,
            }}
          />
        </TouchableOpacity>
      );
    } else if (item.messages_type === MessType.MoreImages) {
      return (
        <View style={styles.messageView}>
          <Text style={styles.messText}>{item.Text}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.messageView}>
          <Text style={styles.messText}>{item.Text}</Text>
        </View>
      );
    }
  };
  chatMessage = ({ item }) => {
    return item.Type === 'CUS' ? (
      <View style={{ flexDirection: 'row' }}>
        {this.renderContent(item)}
        <Text style={{ ...styles.messTime, marginLeft: normalize(15) }}>
          {moment.unix(item.CreatedTime).format('hh:mm MM-DD-YY')}
        </Text>
      </View>
    ) : (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={{ ...styles.messTime, marginRight: normalize(15) }}>
          {moment.unix(item.CreatedTime).format('hh:mm MM-DD-YY')}
        </Text>
        {this.renderContent(item)}
      </View>
    );
  };
  // modal cancel
  popupActionCancel = () => {
    const { isVisiblePopupCancel, setisVisiblePopupCancel } = this.props;
    return (
      <Modal
        isVisible={isVisiblePopupCancel}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => this.setState({ isVisiblePopupCancel: false })}>
        <TouchableOpacity
          //report screen
          onPress={() => {
            setisVisiblePopupCancel(false);
          }}
          style={styles.buttonReport}>
          <Text style={{ ...styles.textPrice, fontSize: 18 }}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setisVisiblePopupCancel(false);
            NavigationServices.navigate(SCENE_NAMES.MAIN);
          }}
          style={styles.buttonChat}>
          <Text style={{ ...styles.textPrice, fontSize: 18, color: 'red' }}>
            Trang chủ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setisVisiblePopupCancel(false);
          }}
          style={styles.buttonCancel}>
          <Text style={{ ...styles.textPrice, fontSize: 18, fontWeight: '700' }}>
            Huỷ bỏ
          </Text>
        </TouchableOpacity>
      </Modal>
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
      viewImagesPop,
      visibleViewing,
      setvisibleViewing,
      isVisibleModalCall,
      setisVisibleModalCall,
      dataSeller,
      onCallPhone,
      setisVisiblePopupCancel,
      visibleChooseImage,
      setvisibleChooseImage,
      chooseImageTake,
    } = this.props;
    const { onInputChat } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2B4F8C' }}>
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
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setisVisibleModalCall(true)}>
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
            <TouchableOpacity onPress={() => setisVisiblePopupCancel(true)}>
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
            inverted
            showsVerticalScrollIndicator={false}
            data={listchat}
            renderItem={({ item }) => <this.chatMessage item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<View style={{ height: height * 0.05 }} />}
            ListFooterComponent={
              <View style={styles.messHeaderContaner}>
                {/* navigate qua profile seller nay  dataSeller?.Merchant &&*/}
                <TouchableOpacity style={styles.avatarView} onPress={() => { }} >
                  <Image source={{ uri: dataSeller?.Avatar }} style={styles.avatar} />
                </TouchableOpacity>
                <Text style={styles.textName}>{dataSeller?.FullName}</Text>
                <Text style={styles.textHint}>{I18n.t(`${NAMESPACE}.chatHeader`)}</Text>
                {dataSeller?.Merchant &&
                  <TouchableOpacity style={styles.btnViewProfile}>
                    <Text>{I18n.t(`${NAMESPACE}.view_profileSeller`)}</Text>
                  </TouchableOpacity>
                }
              </View>
            }
          />
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
          <View
            style={{
              ...styles.containerComposize,
              height: onInputChat ? width * 0.24 : height * 0.07,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setvisibleChooseImage(true)}>
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
              />
              <TouchableOpacity
                onPress={() => sentMessage(MessType.Text, textchat)}>
                <Image
                  source={require('../../../assets/images/ic_sendmess.png')}
                  style={styles.iconsend}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <ImageView
          images={[{ uri: viewImagesPop }]}
          imageIndex={0}
          visible={visibleViewing}
          onRequestClose={() => setvisibleViewing(false)}
        />
        <Popup1Button
          onClosePress={() => setisVisibleModalCall(false)}
          onConfirm={onCallPhone}
          title={'Gọi ngay'}
          content={'Kết nối cuộc gọi'}
          numberPhone={dataSeller?.Phone}
          isVisible={isVisibleModalCall}
        />
        {/* Popup choose image */}
        <PopupChooseImage
          onChooseTake={chooseImageTake}
          onChooseLibrary={openGalary}
          onClosePress={() => setvisibleChooseImage(false)}
          isVisible={visibleChooseImage}
        />
        <this.popupActionCancel />
      </SafeAreaView>
    );
  }
}
export default ChatBoxContainer;
