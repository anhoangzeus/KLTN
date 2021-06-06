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
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
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
  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2B4F8C"
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
          <Text style={styles.headerText}>
            {I18n.t(`${NAMESPACE}.payment`)}
          </Text>
        </View>
        <ScrollView style={{height: height}}>
          <View style={styles.listItem}>
            <View style={styles.addressView}>
              <View style={styles.addressViewRow}>
                <Text style={styles.addresstitle}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.addressdelivery`)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    NavigationServices.navigate(SCENE_NAMES.AddRessScreen);
                  }}>
                  <Text style={styles.greenText}>
                    {I18n.t(`${NAMESPACE}.change`)}
                  </Text>
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
            <Text style={styles.payText}>
              {I18n.t(`${NAMESPACE}.choosemethod`)}
            </Text>
            <View style={styles.option}>
              <RadioButton
                value="first"
                color="#3399ff"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => selectMethod('first')}
              />
              <FontAwesome name="money" size={30} color="green" />
              <Text style={styles.method}>
                {I18n.t(`${NAMESPACE}.cashmethod`)}
              </Text>
            </View>
            <View style={styles.option}>
              <RadioButton
                value="second"
                color="#3399ff"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => selectMethod('second')}
              />
              <FontAwesome name="credit-card" size={30} color="orange" />
              <Text style={styles.method}>
                {I18n.t(`${NAMESPACE}.onlinemethod`)}
              </Text>
            </View>
          </View>
          <View style={styles.count}>
            <View flexDirection="row" justifyContent="space-between">
              <Text style={styles.txtMoney} color="#666666">
                {I18n.t(`${NAMESPACE}.provisional`)}
              </Text>
              <Text style={styles.txtMoney}>
                <NumberFormat value={prop.content} />
              </Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text style={styles.txtMoney} color="#666666">
                {I18n.t(`${NAMESPACE}.deliveryprice`)}
              </Text>
              <Text style={styles.txtMoney}>
                <NumberFormat value={shipMoney} />
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.blankView}>
          <View style={styles.TotalView}>
            <Text style={styles.txtMoney}>
              {' '}
              {I18n.t(`${NAMESPACE}.total`)}:{' '}
            </Text>
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
            <Text style={styles.btnXacNhan}>
              {' '}
              {I18n.t(`${NAMESPACE}.confirm`)}
            </Text>
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
              <FontAwesome5 name="kiss-wink-heart" size={70} color="#2B4F8C" />
              <Text style={styles.modalText}>
                {' '}
                {I18n.t(`${NAMESPACE}.orderdone`)}
              </Text>
              <TouchableOpacity
                style={styles.modalMain}
                onPress={() => {
                  NavigationServices.navigate(SCENE_NAMES.MAIN);
                }}>
                <Text style={styles.btnContinue}>
                  {I18n.t(`${NAMESPACE}.continueshopping`)}
                </Text>
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
              <Text style={styles.btnConfirm}>
                {I18n.t(`${NAMESPACE}.confirmorder`)}
              </Text>
              <Text style={styles.address}>
                {I18n.t(`${NAMESPACE}.addressdelivery`)}:{' '}
                {prop.address.NumberAddress}, {prop.address.Xa},{' '}
                {prop.address.Huyen}, {prop.address.City}
              </Text>
              <Text style={styles.address}>
                {checked === 'first'
                  ? I18n.t(`${NAMESPACE}.COD`)
                  : I18n.t(`${NAMESPACE}.onlinemethod`)}
              </Text>
              <Text style={styles.address}>
                {I18n.t(`${NAMESPACE}.deliveryprice`)}:
                <NumberFormat value={shipMoney} />
              </Text>
              <Text style={styles.Amount}>
                {I18n.t(`${NAMESPACE}.total`)}:
                {/* <NumberFormat value={props.amount} /> */}
              </Text>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.btnThanhToan}
                  onPress={() => {
                    thanhToan();
                  }}>
                  <Text style={styles.textStyle}>
                    {' '}
                    {I18n.t(`${NAMESPACE}.confirm`)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => {
                    handleCloseConfirm();
                  }}>
                  <Text style={styles.textStyle}>
                    {' '}
                    {I18n.t(`${NAMESPACE}.back`)}
                  </Text>
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
