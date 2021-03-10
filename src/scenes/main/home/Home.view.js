/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import styles from './Home.styles';
import AppImage from 'components/AppImage';
import withLoading from 'components/HOC/withLoading';
import AppButton from 'components/AppButton';
import ScrollViewPullRefresh from 'components/ScrollViewPullRefresh';
import {showNotification} from 'components/Modal/ModalNotification';
import AppIcon from 'components/AppIcon';
import {SVG_NAME} from 'assets/path';

function HomeView(props) {
  const {onPressTestApi} = props;
  return (
    <ScrollViewPullRefresh safeArea>
      <View style={styles.container}>
        <AppImage url="https://github.com/DylanVann/react-native-fast-image/raw/master/docs/assets/priority.gif" />
        <Text>Home Screen</Text>
        <AppButton
          style={styles.btnLogin}
          title={'Test Api'}
          onPress={onPressTestApi}
        />
        <Text>Home Screen</Text>
        <AppIcon style={{color: 'red'}} name={SVG_NAME.IMAGE} />

        <AppButton
          style={styles.btnLogin}
          title={'Test Modal Notification'}
          onPress={() => {
            showNotification({
              message: 'ahihi',
              // hasClose: true,
              // hasCancel: true,
            });
          }}
        />
      </View>
    </ScrollViewPullRefresh>
  );
}

export default withLoading(HomeView);
