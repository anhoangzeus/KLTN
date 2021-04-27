import * as React from 'react';
import {PureComponent} from 'react';
import {Text, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Scenes from 'scenes';
import configureStore from 'appRedux/store/configureStore';
import FCMService from './src/services/api/NotificationService';
import AsyncStorage from '@react-native-community/async-storage';
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
          this.onActionNotificationListener(notification)();
          return;
        }
      });
      await FCMService.subscribeToTopic('alldevices');
    };
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
