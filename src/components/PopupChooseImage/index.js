/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import I18n from 'utils/i18n';

class PopupChooseImage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {onClosePress, onChooseTake, onChooseLibrary, children} = this.props;
    return (
      <View style={styles.container}>
        {/* Header */}
        {/* <View style={styles.header}>
          <View style={{width: 30}} />
          <Text style={styles.title}>Chức năng</Text>
          <Icon
            onPress={onClosePress}
            type="ant-design"
            name="close"
            color="red"
            size={30}
          />
        </View> */}
        {/* 2 button */}
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => {
              onClosePress();
              setTimeout(() => onChooseTake(), 200);
            }}
            style={styles.btnChoose}>
            <Text>{I18n.t('common.takephoto')}</Text>
          </TouchableOpacity>
          <View style={{height: 10}} />
          <TouchableOpacity
            onPress={() => {
              onClosePress();
              setTimeout(() => onChooseLibrary(), 200);
            }}
            style={styles.btnChoose}>
            <Text>{I18n.t('common.oneImage')}</Text>
          </TouchableOpacity>
          <View style={{height: 10}} />
          {children}
        </View>
      </View>
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
  onClosePress: () => {},
  isVisible: false,
};

export default PopupChooseImage;
