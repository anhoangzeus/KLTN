/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ProductItem from 'components/ProductItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import styles from './Search.styles';
import SCENE_NAMES from 'constants/sceneName';
import {ScrollView} from 'react-native-gesture-handler';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const {width, height} = Dimensions.get('screen');
// import {NAMESPACE} from './Search.constants';

function SearchView(props) {
  const {
    listStore,
    listSeller,
    refreshing,
    textNoti,
    setSearchText,
    setLoading,
    searchDictionary,
    renderNofiCart,
    _onRefresh,
  } = props;

  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar
          backgroundColor="#2B4F8C"
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{width: width / 10}}
            onPress={() => NavigationServices.goBack()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color="#fff"
              style={{marginLeft: width / 40}}
            />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <FontAwesome name="search" size={24} color="#969696" />
            <TextInput
              style={styles.inputText}
              placeholder={I18n.t(`${NAMESPACE}.search`)}
              autoFocus={true}
              onChangeText={(text) => {
                setSearchText(text);
                setLoading(true);
              }}
              onSubmitEditing={() => searchDictionary()}
            />
          </View>
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => NavigationServices.navigation.navigate('Cart')}>
            <FontAwesome name="shopping-cart" size={24} color="#fff" />
            {renderNofiCart()}
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.bodyContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {I18n.t(`${NAMESPACE}.result`)}
              </Text>

              <View style={styles.listItemContainer}>
                {listStore[0] == null ? (
                  <View>
                    <Text style={{color: '#000'}}>{textNoti}</Text>
                  </View>
                ) : null}
                {null ? (
                  <View style={styles.viewLoading}>
                    <ActivityIndicator size="large" color="'#a2459a" />
                  </View>
                ) : (
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                      />
                    }
                    horizontal={false}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    data={listStore}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                            item: item,
                          })
                        }>
                        <ProductItem item={item} />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
              <View style={styles.listItemContainer}>
                {listStore[0] == null ? (
                  <View>
                    {/* <Text style={{color: '#000'}}>{textNoti}</Text> */}
                  </View>
                ) : null}
                {null ? (
                  <View style={styles.viewLoading}>
                    <ActivityIndicator size="large" color="'#a2459a" />
                  </View>
                ) : (
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                      />
                    }
                    horizontal={false}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    data={listSeller}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                            item: item,
                          })
                        }>
                        <ProductItem item={item} />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{height: height / 20}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(SearchView);
