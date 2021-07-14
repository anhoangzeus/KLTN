import * as React from 'react';
import {View} from 'react-native';
import styles from './EditStore.styles';
import AppText from 'components/AppText';
// import {NAMESPACE} from './EditStore.constants';

function EditStoreView() {
  return (
    <View style={styles.container}>
      <AppText>EditStore</AppText>
    </View>
  );
}

export default React.memo(EditStoreView);
