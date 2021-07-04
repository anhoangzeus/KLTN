import * as React from 'react';
import {PureComponent} from 'react';
import {Text, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Scenes from 'scenes';
import configureStore from 'appRedux/store/configureStore';
import FCMService from './src/services/api/NotificationService';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import PushNotification from 'react-native-push-notification';
const storeConfig = configureStore();

class App extends PureComponent {
  constructor(props) {
    super(props);
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    if (TextInput.defaultProps == null) {
      TextInput.defaultProps = {};
    }
    TextInput.defaultProps.allowFontScaling = false;
    Text.defaultProps.allowFontScaling = false;
  }
  onActionNotificationListener(notification) {
    NavigationServices.navigate(SCENE_NAMES.NOTIFY);
  }
  componentDidMount() {
    FCMService.getFcmToken((token) => {
      console.log('token set storage:', token);
      AsyncStorage.setItem('token', token);
    });

    const init = async () => {
      FCMService.initPushNotifications((notification, type) => {
        if (type === 'background') {
          return;
        }
        // eslint-disable-next-line no-unused-vars
        const {foreground, userInteraction} = notification;
        if (userInteraction) {
          this.onActionNotificationListener(notification);
          return;
        }
      });
      await FCMService.subscribeToTopic('alldevices');
    };

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('remote messgae foreground', remoteMessage);
      PushNotification.localNotification({
        message: 'My Notification Message',
        title: 'My Notification Title',
        channelId: 'default',
      });
    });
    //return unsubscribe;
    unsubscribe();
    init();
  }

  render() {
    return (
      <Provider store={storeConfig.store}>
        <PersistGate loading={null} persistor={storeConfig.persistor}>
          <Scenes />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
