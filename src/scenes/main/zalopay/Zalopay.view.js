import * as React from 'react';
import {View} from 'react-native';
import styles from './Zalopay.styles';
import AppText from 'components/AppText';
// import {NAMESPACE} from './Zalopay.constants';

function ZalopayView() {
  return (
    <View style={styles.container}>
      <AppText>Zalopay</AppText>
    </View>
  );
}

export default React.memo(ZalopayView);
