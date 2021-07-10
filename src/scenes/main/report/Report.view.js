import * as React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import styles from './Report.styles';
import {Modal} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import I18n from 'utils/i18n';
import NavigationServices from 'utils/navigationServices';
const NAMESPACE = 'common';
// import {NAMESPACE} from './Report.constants';

function ReportView(props) {
  const {
    content,
    setContent,
    rule1,
    rule2,
    rule3,
    rule4,
    rule5,
    visible,
    setRule1,
    setRule2,
    setRule3,
    setRule4,
    setRule5,
    onPress,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.vHeader}>
          <TouchableOpacity
            style={styles.vBack}
            onPress={() => NavigationServices.goBack()}>
            <Icon
              type="font-awesome"
              name="angle-left"
              size={30}
              color={'black'}
            />
          </TouchableOpacity>

          <View style={styles.vTitleContainer}>
            <Text style={styles.txtTitle}>Report</Text>
          </View>
        </View>
        {/* <View style={styles.line} /> */}
      </View>
      <ScrollView style={styles.viewStyle}>
        <Text style={styles.textStyle}>
          {I18n.t(`${NAMESPACE}.TheReasonForTheReport`)}
        </Text>
        <View animation="slideInDown">
          <TouchableOpacity
            onPress={() => setRule1(!rule1)}
            style={styles.rowGender}
            key={1}>
            <Icon
              name={rule1 == true ? 'check-circle' : 'radio-button-unchecked'}
              type="material"
              size={25}
              color={rule1 == true ? '#15B9FF' : '#E4E3E3'}
            />
            <Text style={styles.textGender}>
              {I18n.t(`${NAMESPACE}.rule1`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRule2(!rule2)}
            style={styles.rowGender}
            key={2}>
            <Icon
              name={rule2 == true ? 'check-circle' : 'radio-button-unchecked'}
              type="material"
              size={25}
              color={rule2 == true ? '#15B9FF' : '#E4E3E3'}
            />
            <Text style={styles.textGender}>
              {I18n.t(`${NAMESPACE}.rule2`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRule3(!rule3)}
            style={styles.rowGender}
            key={3}>
            <Icon
              name={rule3 == true ? 'check-circle' : 'radio-button-unchecked'}
              type="material"
              size={25}
              color={rule3 == true ? '#15B9FF' : '#E4E3E3'}
            />
            <Text style={styles.textGender}>
              {I18n.t(`${NAMESPACE}.rule3`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRule4(!rule4)}
            style={styles.rowGender}
            key={4}>
            <Icon
              name={rule4 == true ? 'check-circle' : 'radio-button-unchecked'}
              type="material"
              size={25}
              color={rule4 == true ? '#15B9FF' : '#E4E3E3'}
            />
            <Text style={styles.textGender}>
              {I18n.t(`${NAMESPACE}.rule4`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRule5(!rule5)}
            style={styles.rowGender}
            key={5}>
            <Icon
              name={rule5 == true ? 'check-circle' : 'radio-button-unchecked'}
              type="material"
              size={25}
              color={rule5 == true ? '#15B9FF' : '#E4E3E3'}
            />
            <Text style={styles.textGender}>
              {I18n.t(`${NAMESPACE}.orther`)}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={content}
          style={styles.textInput}
          placeholder={I18n.t(`${NAMESPACE}.PleaseEnter`)}
          editable={rule5}
          onChangeText={(text) => setContent(text)}
        />
      </ScrollView>
      <View style={styles.styleButton}>
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer]}>
          {/* <View style={{}}> */}
          <View style={styles.styleView}>
            <Text style={[styles.buttonText]}>
              {I18n.t(`${NAMESPACE}.send`)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={visible} style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.rpText}> {I18n.t(`${NAMESPACE}.senddone`)}</Text>
          <View style={styles.action} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default React.memo(ReportView);
