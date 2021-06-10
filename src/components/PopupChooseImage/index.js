/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import styles from './styles';
import I18n from 'utils/i18n';

class PopupChooseImage extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { isVisible, onClosePress, onChooseTake, onChooseLibrary, children } = this.props;
    return (
      <Modal animationInTiming={1} animationOutTiming={1} animationIn="bounceIn" animationOut="bounceOut" statusBarTranslucent={true}
        isVisible={isVisible} onBackdropPress={onClosePress}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ width: 30 }} />
            <Text style={styles.title}>Chức năng</Text>
            <Icon onPress={onClosePress} type="ant-design" name="close" color="red" size={30} />
          </View>
          {/* 2 button */}
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => { onClosePress(); setTimeout(() => onChooseTake(), 200); }} style={styles.btnChoose}>
              <Text>{I18n.t('common.takephoto')}</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <TouchableOpacity onPress={() => { onClosePress(); setTimeout(() => onChooseLibrary(), 200); }} style={styles.btnChoose}>
              <Text>{I18n.t('common.oneImage')}</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            {children}
          </View>

        </View>
      </Modal>
    );
  }
}

// Prop type warnings
PopupChooseImage.propTypes = {
  onClosePress: PropTypes.func,
  isVisible: PropTypes.bool,
  title: PropTypes.string,
};

// Defaults for props
PopupChooseImage.defaultProps = {
  onClosePress: () => { },
  isVisible: false,
};

export default PopupChooseImage;
