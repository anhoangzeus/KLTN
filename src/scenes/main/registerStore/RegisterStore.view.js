import * as React from 'react';
import {SafeAreaView} from 'react-native';
import styles from './RegisterStore.styles';

// import {NAMESPACE} from './RegisterStore.constants';

function RegisterStoreView() {
  return <SafeAreaView style={styles.container} />;
}

export default React.memo(RegisterStoreView);
