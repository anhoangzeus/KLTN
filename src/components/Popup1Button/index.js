// @flow

import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

export default class Popup1Button extends React.Component {
    render() {
        const { isVisible, onClosePress, title, children, numberPhone, content, onConfirm } = this.props;
        return (
            <Modal isVisible={isVisible} onBackdropPress={onClosePress}>
                <View style={styles.container}>
                    <Icon name="close" size={20} color="#000" style={styles.iconClose} onPress={onClosePress} />
                    <Text style={styles.textTitle}>{title}</Text>
                    {numberPhone &&
                        <TextInput value={numberPhone}
                            style={styles.textContent}
                            editable={false}
                        />}
                    <Text style={styles.textContent}>{content}</Text>
                    {/* Children */}
                    {children}
                    <TouchableOpacity style={styles.btnConfirm}
                        onPress={onConfirm}>
                        <Text style={styles.textButton}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

// Prop type warnings
Popup1Button.propTypes = {
    onClosePress: PropTypes.func,
    isVisible: PropTypes.bool,
    title: PropTypes.string,
};

// Defaults for props
Popup1Button.defaultProps = {
    onClosePress: () => { },
    isVisible: false,
};
