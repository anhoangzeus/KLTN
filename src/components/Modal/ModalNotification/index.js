import React, {useEffect, useState, useCallback} from 'react';
import styles from './styles';
import {View, DeviceEventEmitter} from 'react-native';
import AppText from 'components/AppText';
import Modal from 'react-native-modal';
import {COLOR_DARK} from 'constants/colors';
import AppButton from 'components/AppButton';
import {getString as getLocale} from 'utils/i18n';
import {Icon} from 'native-base';

const MODAL = 'MODAL_NOTIFICATION';

const optionsDefault = {
  title: getLocale('common.alert'),
  message:
    'Are you sure to end this meeting? After ending, you will not able to invite anyone and start that meeting  ',
  hasCancel: false,
  hasConfirm: true,
  hasClose: false,
  textCancel: getLocale('common.cancel'),
  textConfirm: getLocale('common.okay'),
  onPressCancel: () => {},
  onPressConfirm: () => {},
};

const ModalNotification = React.memo(({onClosed}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState(optionsDefault);

  const onPressCancel = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      options?.onPressCancel();
    }, 600);
  }, [options]);

  const onPressConfirm = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      options?.onPressConfirm();
    }, 600);
  }, [options]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      MODAL,
      (isShow, _options) => {
        if (isShow) {
          setOptions({...optionsDefault, ..._options});
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
    );

    return () => {
      listener.remove();
    };
  }, [options]);

  return (
    <Modal
      hideModalContentWhileAnimating
      useNativeDriver
      isVisible={isVisible}
      coverScreen
      backdropColor={COLOR_DARK}
      backdropOpacity={0.7}
      style={styles.modal}
      onBackButtonPress={onClosed}
      onBackdropPress={onClosed}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText semibold large style={styles.readyText}>
            {options.title}
          </AppText>
          {options.hasClose && (
            <Icon
              type="AntDesign"
              style={styles.icon}
              onPress={() => setIsVisible(false)}
              name="close"
            />
          )}
        </View>
        <AppText small style={styles.confirmOrderText}>
          {options.message}
        </AppText>
        {options.hasConfirm && (
          <AppButton
            style={styles.orderButton}
            title={options.textConfirm}
            onPress={onPressConfirm}
          />
        )}
        {options.hasCancel && (
          <AppButton
            style={styles.cancelButton}
            title={options.textCancel}
            onPress={onPressCancel}
          />
        )}
      </View>
    </Modal>
  );
});

export const showNotification = (options = optionsDefault) => {
  DeviceEventEmitter.emit(MODAL, true, options);
};

ModalNotification.show = showNotification;

export default ModalNotification;
