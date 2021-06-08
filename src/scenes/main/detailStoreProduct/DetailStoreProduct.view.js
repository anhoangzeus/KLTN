import * as React from 'react';
import {View} from 'react-native';
import styles from './DetailStoreProduct.styles';
import AppText from 'components/AppText';
// import {NAMESPACE} from './DetailStoreProduct.constants';

function DetailStoreProductView() {
  return (
    <View style={styles.container}>
      <AppText>DetailStoreProduct</AppText>
    </View>
  );
}

export default React.memo(DetailStoreProductView);
