import * as React from 'react';
import {
  Text,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import styles from './PaymentMethod.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RadioButton} from 'react-native-paper';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import NumberFormat from 'components/NumberFormat';
// import {NAMESPACE} from './PaymentMethod.constants';
const {height, width} = Dimensions.get('screen');
function PaymentMethodView(props) {
  const {
    thanhToan,
    handleCloseConfirm,
    setVisibleConfirm,
    checked,
    selectMethod,
    modalVisible,
    modalVisibleConfirm,
    shipMoney,
    prop,
  } = props;
  console.log('>>> gia tri cua prop>>>>', shipMoney);
  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#a2459a"
          translucent={false}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{width: width / 5}}
            onPress={() => NavigationServices.goBack()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color="#fff"
              style={{marginLeft: width / 40}}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Thanh Toán</Text>
        </View>
        <ScrollView style={{height: height}}>
          <View style={styles.listItem}>
            <View style={styles.addressView}>
              <View style={styles.addressViewRow}>
                <Text style={styles.addresstitle}>Địa chỉ nhận hàng</Text>
                <TouchableOpacity
                  onPress={() => {
                    NavigationServices.navigate(SCENE_NAMES.AddRessScreen);
                  }}>
                  <Text style={styles.greenText}>Thay đổi</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.address}>
                {prop.address.NumberAddress}, {prop.address.Xa},{' '}
                {prop.address.Huyen}, {prop.address.City}
              </Text>
              <Text style={styles.address}>
                {prop.address.ShipName} - {prop.address.ShipPhone}
              </Text>
              <View style={styles.infoView} />
            </View>
          </View>
          <View style={styles.paymentoption}>
            <Text style={styles.payText}>Chọn hình thức thanh toán</Text>
            <View style={styles.option}>
              <RadioButton
                value="first"
                color="#3399ff"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => selectMethod('first')}
              />
              <FontAwesome name="money" size={30} color="green" />
              <Text style={styles.method}>Thanh toán tiền mặt</Text>
            </View>
            <View style={styles.option}>
              <RadioButton
                value="second"
                color="#3399ff"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => selectMethod('second')}
              />
              <FontAwesome name="credit-card" size={30} color="orange" />
              <Text style={styles.method}>Thanh toán trực tuyến </Text>
            </View>
          </View>
          <View style={styles.count}>
            <View flexDirection="row" justifyContent="space-between">
              <Text style={styles.txtMoney} color="#666666">
                Tạm tính
              </Text>
              <Text style={styles.txtMoney}>
                <NumberFormat value={prop.content} />
              </Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text style={styles.txtMoney} color="#666666">
                Phí vận chuyển
              </Text>
              <Text style={styles.txtMoney}>
                <NumberFormat value={shipMoney} />
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.blankView}>
          <View style={styles.TotalView}>
            <Text style={styles.txtMoney}>Thành tiền: </Text>
            <Text
              color="red"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{fontSize: 20, marginHorizontal: 10, color: '#000'}}>
              <NumberFormat value={prop.content + shipMoney} />
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              setVisibleConfirm(true);
            }}>
            <Text style={styles.btnXacNhan}>Xác Nhận</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome5 name="kiss-wink-heart" size={70} color="#a2459a" />
              <Text style={styles.modalText}>Đặt hàng thành công!</Text>
              <TouchableOpacity
                style={styles.modalMain}
                onPress={() => {
                  NavigationServices.navigate(SCENE_NAMES.MAIN);
                }}>
                <Text style={styles.btnContinue}>Tiếp tục mua sắm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleConfirm}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={{...styles.modalView, padding: width / 15}}>
              <Text style={styles.btnConfirm}>Xác nhận đơn hàng</Text>
              <Text style={styles.address}>
                Địa chỉ nhận hàng: {prop.address.NumberAddress},{' '}
                {prop.address.Xa}, {prop.address.Huyen}, {prop.address.City}
              </Text>
              <Text style={styles.address}>
                {checked == 'first'
                  ? 'Thanh toán khi nhận hàng'
                  : 'Thanh toán trực tuyến'}
              </Text>
              <Text style={styles.address}>
                Phí vận chuyển:
                <NumberFormat value={shipMoney} />
              </Text>
              <Text style={styles.Amount}>
                Tổng tiền:
                {/* <NumberFormat value={props.amount} /> */}
              </Text>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.btnThanhToan}
                  onPress={() => {
                    thanhToan();
                  }}>
                  <Text style={styles.textStyle}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => {
                    handleCloseConfirm();
                  }}>
                  <Text style={styles.textStyle}>Trở về</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(PaymentMethodView);
