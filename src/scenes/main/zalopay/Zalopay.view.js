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
// import {NAMESPACE} from './Zalopay.constants';

function ZalopayView(props) {
  const {payOrder, getStatus, modalVisible, amount} = props;
  console.log('gia tri hoa don: ', amount);
  return (
    <View>
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
        <Text style={styles.headerText}>Thanh Toán</Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <Image
          source={require('../../../assets/images/zalopay.png')}
          style={styles.imgZalo}
        />
        <Text style={styles.welcomeHead}>Thanh toán qua ZaloPay</Text>
        <Text style={styles.welcome}>
          Tổng hóa đơn: <NumberFormat value={amount} />
        </Text>
        <TouchableOpacity
          style={styles.btnPayment}
          onPress={() => {
            payOrder();
          }}>
          <Text style={styles.btnOpen}>Mở ZaloPay để thanh toán</Text>
        </TouchableOpacity>
        <View>
          <Button
            title="Về lại trang chủ"
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
                <Text style={styles.modalText}>Mua thành công!</Text>
                <Text style={styles.modalText}>Nhấn để về trang chủ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default React.memo(ZalopayView);
