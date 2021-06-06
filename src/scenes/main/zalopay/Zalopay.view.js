import * as React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Image,
  Modal,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import NumberFormat from 'components/NumberFormat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import styles from './Zalopay.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
// import {NAMESPACE} from './Zalopay.constants';

function ZalopayView(props) {
  const {payOrder, getStatus, modalVisible, amount} = props;
  console.log('gia tri hoa don: ', amount);
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.btnback}
          onPress={() => NavigationServices.goBack()}>
          <FontAwesome
            name="angle-left"
            size={35}
            color="#fff"
            style={styles.iconback}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{I18n.t(`${NAMESPACE}.payment`)}</Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <Image
          source={require('../../../assets/images/zalopay.png')}
          style={styles.imgZalo}
        />
        <Text style={styles.welcomeHead}>{I18n.t(`${NAMESPACE}.zalopay`)}</Text>
        <Text style={styles.welcome}>
          {I18n.t(`${NAMESPACE}.total`)}: <NumberFormat value={amount} />
        </Text>
        <TouchableOpacity
          style={styles.btnPayment}
          onPress={() => {
            payOrder();
          }}>
          <Text style={styles.btnOpen}>{I18n.t(`${NAMESPACE}.openzalo`)}</Text>
        </TouchableOpacity>
        <View>
          <Button
            title={I18n.t(`${NAMESPACE}.backhome`)}
            type="outline"
            style={styles.btnHome}
            onPress={() => {
              getStatus();
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <TouchableOpacity
              onPress={() => {
                getStatus();
              }}>
              <View style={styles.modalView}>
                <MaterialIcons name="done" size={55} color="#00cc00" />
                <Text style={styles.modalText}>
                  {I18n.t(`${NAMESPACE}.paysuccess`)}
                </Text>
                <Text style={styles.modalText}>
                  {I18n.t(`${NAMESPACE}.backhome`)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(ZalopayView);
