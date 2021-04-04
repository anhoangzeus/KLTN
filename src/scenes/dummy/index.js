import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import PickerView from 'components/Picker';
import AppText from 'components/AppText';
import PaginationList from 'components/PaginationList';
import { testListData } from 'helpers/dataExamples';
import { pushPagingData } from 'helpers/pagings';
import { Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import AppButton from 'components/AppButton';
import ModalView from 'components/Modal/ModalView';

const listItem = [
  { label: 'Nam', value: 0 },
  { label: 'Nu', value: 1 },
];

const styles = StyleSheet.create({
  text1: { backgroundColor: 'blue' },
  text2: { color: 'white' },
});

export default function DummyScreen() {
  const [value, scalePortrait] = useState(listItem[0]);
  const [dataPaging, setDataPaging] = useState(testListData);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const renderItem = useCallback(({ item }) => {
    return <AppText>{item.name}</AppText>;
  }, []);
  console.log('>>>initialWindowSafeAreaInsets', initialWindowSafeAreaInsets);

  const onFetch = useCallback(
    (page) => {
      setIsFetching(true);
      setTimeout(() => {
        setIsFetching(false);
        testListData.pagination.currentPage++;
        setDataPaging(pushPagingData(dataPaging, testListData));
      }, 500);
      console.log('>>>ABC', { page });
    },
    [dataPaging],
  );

  const onRefresh = useCallback(() => {
    testListData.pagination.currentPage = 1;
    setDataPaging(testListData);
    console.log('>>>onRefresh');
  }, []);
  console.info(testListData);

  const styleList = useMemo(
    () => ({
      backgroundColor: 'red',
      height: 200,
    }),
    [],
  );
  // const styleList = {
  //   backgroundColor: 'red',
  //   height: 200,
  // };

  return (
    <View>
      <AppText bold large>
        Picker
      </AppText>
      <PickerView
        value={value.value}
        onValueChange={(e, idx) => {
          scalePortrait(listItem[idx]);
        }}
        touchableOpacity
        useNativeAndroidPickerStyle={false}
        Icon={() => null}
        items={listItem}
        placeholderTextColor="#000"
        onSubmit={(e) => {
          console.log('>>>Submit', e);
          scalePortrait(e);
        }}
        renderInputView={() => <AppText>{value.label}</AppText>}
      // style={{
      //   headlessAndroidContainer: {
      //     width: '100%',
      //   },
      //   viewContainer: {
      //     width: '100%',
      //   },
      // }}
      />
      <AppText style={[styles.text1, styles.text2]} bold large>
        List Paging
      </AppText>
      <PaginationList
        onFetch={onFetch}
        onRefresh={onRefresh}
        renderItem={renderItem}
        dataPaging={dataPaging}
        isFetching={isFetching}
        style={styleList}
        setDataPaging={setDataPaging}
      />
      <Icon type="FontAwesome" name="home" />
      <FontAwesome name="home" />
      <AppButton
        onPress={() => {
          setIsOpen(!isOpen);
        }}
        title={'Open Modal'}
      />
      <ModalView isVisible={isOpen} />
    </View>
  );
}
