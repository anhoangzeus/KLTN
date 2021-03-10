import React, {useEffect, useState, useCallback} from 'react';
import NetInfo from '@react-native-community/netinfo';
import RootNavigator from 'routers/RootNavigator';
import {onAppConnectivityChange} from 'appRedux/actions/connectActions';
import {useActions} from 'hooks/useActions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getIsLoadingSelector} from 'appRedux/selectors/loadingSelector';
import {getIsConnectedSelector} from 'appRedux/selectors/connectSelector';
import {hideError} from 'appRedux/actions/alertActions';
import AppLoading from 'components/AppLoading';
import {getActiveRouteName} from 'utils/activeRouteName';
import {BackHandler} from 'react-native';
import SCENE_NAMES from 'constants/sceneName';
import NavigationServices from 'utils/navigationServices';
import I18n from 'utils/i18n';
import ModalNotification, {
  showNotification,
} from 'components/Modal/ModalNotification';

export default function Scenes() {
  const isConnected = useSelectorShallow(getIsConnectedSelector);
  const actions = useActions({onAppConnectivityChange, hideError});
  const [currentRouteName, setCurrentRouteName] = useState('');
  const isLoading = useSelectorShallow(getIsLoadingSelector);

  const handleBackPress = useCallback(() => {
    console.log('>>>isLoading', isLoading);

    if (isLoading) {
      return true;
    }
    switch (currentRouteName) {
      case SCENE_NAMES.HOME:
      case SCENE_NAMES.SIGN_IN:
      case '':
        showNotification({
          hasCancel: true,
          title: I18n.t('alertExitApp.title'),
          message: I18n.t('alertExitApp.description'),
          textCancel: I18n.t('alertExitApp.cancel'),
          onPressConfirm: BackHandler.exitApp,
        });
        break;
      case 'AnotherCase':
        // handler
        break;
      default:
        NavigationServices.goBack();
        break;
    }
    return true;
  }, [isLoading, currentRouteName]);

  const onNavigationStateChange = (action) => {
    // console.log('>>>>ACTION_NAVIGATOR:', {action});
    const routeName = getActiveRouteName(action);
    if (currentRouteName !== routeName) {
      setCurrentRouteName(routeName);
      // change the tracker here to use other Mobile analytics SDK.
    }
  };

  const netInfoListener = useCallback(
    (state) => {
      if (state.isConnected !== isConnected) {
        actions.onAppConnectivityChange(state.isConnected);
      }
    },
    [isConnected, actions],
  );

  // Subscribe net info
  useEffect(() => {
    const subscribeNetInfo = NetInfo.addEventListener(netInfoListener);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => {
      subscribeNetInfo();
      backHandler.remove();
    };
  }, [netInfoListener, handleBackPress]);

  return (
    <>
      <RootNavigator onNavigationStateChange={onNavigationStateChange} />
      {isLoading && <AppLoading />}
      <ModalNotification />
    </>
  );
}
