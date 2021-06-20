import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import { NotificationConstants } from 'utils/appContants';
export function displayNotification({ title, body }, data) {
  PushNotification.localNotificationSchedule({
    title,
    message: body, // (required)
    date: new Date(Date.now() + 1 * 1000), // in 60 secs
    userInfo: data || {},
  });
}
export default class NotificationService {
  static initPushNotifications = (onNotification = () => { }) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN register FCM:', token);
        NotificationConstants.fcmToken = token?.token
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        onNotification(notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'default', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    if (Platform.OS === 'ios') {
      messaging().onMessage(async (remoteMessage) => {
        console.log('>>>>remoteMessage', remoteMessage);
        PushNotification.localNotification({
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          userInfo: remoteMessage.data,
          onlyAlertOnce: true,
          priority: 'high',
          id: remoteMessage.messageId,
          channelId: Date.now().toString(),
          soundName: 'default',
        });
      });
    }
    // else {
    //   messaging().onMessage(async (remoteMessage) => {
    //     console.log('>>>>remoteMessage Android', remoteMessage);
    //     PushNotification.localNotification({
    //       title: remoteMessage.notification.title,
    //       message: remoteMessage.notification.body,
    //       userInfo: remoteMessage.data,
    //       onlyAlertOnce: true,
    //       priority: 'high',
    //       channelId: 'fcm_fallback_notification_channel',
    //       soundName: 'default',
    //     });
    //   });
    // }

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      onNotification(remoteMessage, 'background');
    });
    // messaging().onNotificationOpenedApp((remoteMessage) => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage,
    //   );
    //   onNotification(remoteMessage);
    // });
    // messaging()
    //   .getInitialNotification()
    //   .then((remoteMessage) => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage,
    //       );
    //       onNotification(remoteMessage);
    //     }
    //   });
  };

  static getFcmToken = (callback = () => { }) => {
    try {
      messaging()
        .getToken()
        .then((token) => {
          if (token) {
            callback(token);
          }
        });
    } catch (error) {
      console.log('error>>', error);
    }
  };

  static subscribeToTopic = (topic) => {
    return messaging().subscribeToTopic(topic);
  };

  static requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      badge: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    } else {
      console.log('Authorization status return false');
    }
    return false;
  };
}
