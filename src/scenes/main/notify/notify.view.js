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
import I18n from 'utils/i18n';
import NavigationServices from 'utils/navigationServices';
import styles from './notify.styles';
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
  }
};
export default function NotifyView(props) {
  const NotificationItem = ({item}) => {
    const {setStateNotigication} = props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setStateNotigication(item.Id);
          NavigationServices.navigate(SCENE_NAMES.Route_Contents, {
            id: item.Id,
          });
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
    redPoint1,
    redPoint2,
    redPoint3,
    setIschoose,
    _onRefresh,
    refreshing,
  } = props;
  return (
    <SafeAreaView style={styles.screenContainersafe}>
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
          </View>
          {loading ? (
            <View style={styles.listIndiContainer}>
              <ActivityIndicator
                size="large"
                color="'#2B4F8C"
                style={styles.indicatorView}
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
