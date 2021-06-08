import auth from '@react-native-firebase/auth';
import Header from 'components/Header';
import {COLOR_BLACK, COLOR_BLUEAIR} from 'constants/colors';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './notify.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
// eslint-disable-next-line no-unused-vars
const renderTrangThai = (Status) => {
  if (Status === '1') {
    return (
      <View>
        <Text style={styles.textSuccess}>
          {' '}
          {I18n.t(`${NAMESPACE}.orderwait`)}
        </Text>
      </View>
    );
  } else if (Status === '2') {
    return (
      <View>
        <Text style={styles.textSuccess}>
          {I18n.t(`${NAMESPACE}.orderwaitpickup`)}
        </Text>
      </View>
    );
  } else if (Status === '3') {
    return (
      <View>
        <Text style={styles.textSuccess}>
          {I18n.t(`${NAMESPACE}.orderdelivery`)}
        </Text>
      </View>
    );
  } else if (Status === '4') {
    return (
      <View>
        <Text style={styles.textSuccess}>
          {I18n.t(`${NAMESPACE}.ordersuccess`)}
          <Text style={styles.textSuccess}>
            {' '}
            {I18n.t(`${NAMESPACE}.pleasereview`)}
          </Text>
        </Text>
      </View>
    );
  } else if (Status === '5') {
    return (
      <View>
        <Text style={styles.textSuccess}>
          {I18n.t(`${NAMESPACE}.ordercancel`)}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.textSuccess}>
          {I18n.t(`${NAMESPACE}.orderreturn`)}
        </Text>
      </View>
    );
  }
};
// const renderTimeLine = (name, item) => {
//   return (
//     <View style={styles.lineContainer}>
//       <View style={styles.lineView} />
//       <View style={styles.lineHolder}>
//         <Text>{name}</Text>
//         <Text>
//           {I18n.t(`${NAMESPACE}.date`)} {item}
//         </Text>
//       </View>
//     </View>
//   );
// };
const OrderItem = ({item, props}) => {
  //const {isdropdownid, navigation} = props;
  // const OrderItem = ({item, props}) => {
  //   return (
  //     <View style={styles.jContent}>
  //       <View style={styles.itemsContainer}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             item.Status === 4
  //               ? navigation.navigate(SCENE_NAMES.TopStackOrder)
  //               : navigation.navigate(SCENE_NAMES.DetailOrderContainer, {
  //                   id: item.orderId,
  //                 });
  //           }}
  //           style={styles.orderWidth}>
  //           <Text style={{color: COLOR_BLUEAIR}}>
  //             {I18n.t(`${NAMESPACE}.orderid`)} {item.orderId}
  //           </Text>
  //           <Text style={{color: COLOR_BLACK}}>
  //             {item.payment === '01'
  //               ? I18n.t(`${NAMESPACE}.cash`)
  //               : I18n.t(`${NAMESPACE}.onlpay`)}
  //           </Text>
  //           {renderTrangThai(item.Status)}
  //           <Text style={{color: COLOR_BLACK}}>
  //             <MaterialCommunityIcons name="clock" size={13} />{' '}
  //             {item.CreatedDate}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       {isdropdownid === item.orderId ? (
  //         <View style={styles.dropContainer}>
  //           {item.TimeLine.ChoXacNhan === ''
  //             ? null
  //             : renderTimeLine(
  //                 I18n.t(`${NAMESPACE}.comfirmgetorder`),
  //                 item.TimeLine.ChoXacNhan,
  //               )}
  //           {item.TimeLine.ChoLayHang === ''
  //             ? null
  //             : renderTimeLine(
  //                 I18n.t(`${NAMESPACE}.getsuccess`),
  //                 item.TimeLine.ChoLayHang,
  //               )}
  //           {item.TimeLine.DangVanChuyen === ''
  //             ? null
  //             : renderTimeLine(
  //                 I18n.t(`${NAMESPACE}.delivering`),
  //                 item.TimeLine.DangVanChuyen,
  //               )}
  //           {item.TimeLine.DaGiaoHang === ''
  //             ? null
  //             : renderTimeLine(
  //                 I18n.t(`${NAMESPACE}.deliverysuccess`),
  //                 item.TimeLine.DaGiaoHang,
  //               )}
  //           {item.TimeLine.DaHuy === ''
  //             ? null
  //             : renderTimeLine(
  //                 I18n.t(`${NAMESPACE}.confirmcancel`),
  //                 item.TimeLine.DaHuy,
  //               )}
  //           {item.TimeLine.TraHang === ''
  //             ? null
  //             : renderTimeLine(
  //                 I18n.t(`${NAMESPACE}.confirmreturn`),
  //                 item.TimeLine.TraHang,
  //               )}
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // };
};
export default function NotifyView(props) {
  const NotificationItem = ({item}) => {
    const {setStateNotigication, navigation} = props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setStateNotigication(item.Id);
          navigation.navigate(SCENE_NAMES.Route_Contents, {id: item.Url});
        }}>
        <View style={styles.itemTopContainer}>
          <View
            style={[
              styles.itemTypeContainer,
              {
                backgroundColor:
                  item.Type === '1' ? COLOR_BLUEAIR : COLOR_BLACK,
              },
            ]}>
            <MaterialCommunityIcons
              name={item.Type === '1' ? 'sale' : 'backup-restore'}
              color="#fff"
              size={22}
            />
          </View>
          <View style={styles.itemTopTextContainer}>
            <Text style={styles.itemName}>{item.Title}</Text>
            <View style={styles.flexTitle}>
              <Text style={styles.itemDate}>{item.CreatedDate}</Text>
              {item.isShow === false && (
                <View style={styles.showdone}>
                  <Text style={styles.shownew}>New</Text>
                </View>
              )}
            </View>
          </View>
          <View />
        </View>
        <View>
          <Text style={styles.itemDetail}>{item.Details}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const {
    listThongBao,
    loading,
    ischoose,
    listOrder,
    redPoint1,
    redPoint2,
    redPoint3,
    setIschoose,
    getlistOrder,
    _onRefresh,
    refreshing,
  } = props;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        {/* <StatusBar barStyle="light-content" /> */}
        <Header title={I18n.t(`${NAMESPACE}.notification`)} isCart={true} />
        <View style={styles.bodyContainer}>
          <View>
            <TouchableOpacity
              onPress={() => setIschoose(1)}
              style={
                ischoose === 1
                  ? styles.buttonActiveContainer
                  : styles.buttonInactiveContainer
              }>
              {ischoose === 1 ? <View style={styles.activeMark} /> : null}
              {ischoose === 1 ? null : redPoint3 ? (
                <View style={styles.redPoint} />
              ) : null}
              <MaterialCommunityIcons
                name="home"
                color={ischoose === 1 ? '#2B4F8C' : '#949494'}
                size={25}
                style={ischoose === 1 ? styles.activeIcon : null}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIschoose(2)}
              style={
                ischoose === 2
                  ? styles.buttonActiveContainer
                  : styles.buttonInactiveContainer
              }>
              {ischoose === 2 ? <View style={styles.activeMark} /> : null}
              {ischoose === 2 ? null : redPoint2 ? (
                <View style={styles.redPoint} />
              ) : null}
              <MaterialCommunityIcons
                name="backup-restore"
                color={ischoose === 2 ? '#2B4F8C' : '#949494'}
                size={25}
                style={ischoose === 2 ? styles.activeIcon : null}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIschoose(3)}
              style={
                ischoose === 3
                  ? styles.buttonActiveContainer
                  : styles.buttonInactiveContainer
              }>
              {ischoose === 3 ? <View style={styles.activeMark} /> : null}
              {ischoose === 3 ? null : redPoint1 ? (
                <View style={styles.redPoint} />
              ) : null}
              <MaterialCommunityIcons
                name="sale"
                color={ischoose === 3 ? '#2B4F8C' : '#949494'}
                size={25}
                style={ischoose === 3 ? styles.activeIcon : null}
              />
            </TouchableOpacity>
            {auth().currentUser ? (
              <TouchableOpacity
                onPress={() => {
                  getlistOrder();
                  setIschoose(4);
                }}
                style={
                  ischoose === 4
                    ? styles.buttonActiveContainer
                    : styles.buttonInactiveContainer
                }>
                {ischoose === 4 ? <View style={styles.activeMark} /> : null}
                {ischoose === 4 ? null : <View style={styles.redPoint} />}
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  color={ischoose === 4 ? '#2B4F8C' : '#949494'}
                  size={25}
                  style={ischoose === 4 ? styles.activeIcon : null}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {loading ? (
            <View style={styles.listIndiContainer}>
              <ActivityIndicator
                size="large"
                color="'#2B4F8C"
                style={styles.indicatorView}
              />
            </View>
          ) : ischoose === 4 ? (
            <View style={styles.listContainer}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                  />
                }
                data={listOrder}
                renderItem={({item}) => <OrderItem item={item} props={props} />}
                keyExtractor={(item) => item.Id}
              />
            </View>
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                  />
                }
                data={listThongBao}
                renderItem={({item}) => <NotificationItem item={item} />}
                keyExtractor={(item, index) => index}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
