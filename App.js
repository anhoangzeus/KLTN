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
import {NOTIFICATION_TYPE} from 'utils/appContants';
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
    //NavigationServices.navigate(SCENE_NAMES.NOTIFY);
    console.log('notification detail', notification);
    switch (notification?.data?.targetModule) {
      case NOTIFICATION_TYPE.GIAM_GIA:
        NavigationServices.navigate(SCENE_NAMES.NOTIFY);
        NavigationServices.navigate(SCENE_NAMES.Route_Contents, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.TIN_TUC:
        NavigationServices.navigate(SCENE_NAMES.NOTIFY);
        NavigationServices.navigate(SCENE_NAMES.Route_Contents, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.XAC_NHAN:
        NavigationServices.navigate(SCENE_NAMES.OrderXuli);
        NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.GIAO_HANG:
        NavigationServices.navigate(SCENE_NAMES.TopStackOrder);
        NavigationServices.navigate(SCENE_NAMES.GIAO_HANG, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.DA_GIAO:
        NavigationServices.navigate(SCENE_NAMES.TopStackOrder);
        NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.DA_HUY:
        NavigationServices.navigate(SCENE_NAMES.TopStackOrder);
        NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.TRA_HANG:
        NavigationServices.navigate(SCENE_NAMES.TopStackOrder);
        NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {
          id: notification?.data?.targetId,
        });
        break;
      case NOTIFICATION_TYPE.APPROVE_STORE:
        NavigationServices.navigate(SCENE_NAMES.PROFILE);
        NavigationServices.navigate(SCENE_NAMES.MyStoreOptionContainer);
        break;
      case NOTIFICATION_TYPE.PRODUCT:
        NavigationServices.navigate(SCENE_NAMES.MAIN);
        NavigationServices.navigate(SCENE_NAMES.SELLERPRODUCT, {
          item: notification?.data?.item,
        });
        break;
      default:
        NavigationServices.navigate(SCENE_NAMES.NOTIFY);
        break;
    }
  }
  componentDidMount() {
    FCMService.getFcmToken((token) => {
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
