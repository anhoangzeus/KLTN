/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';


// Initial state
const INITIAL_STATE = {};

class Loading extends Component {
    // Define prop types
    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        color: PropTypes.string,
        type: PropTypes.oneOf(['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt', 'LottieSearching']),
    };

    // Set default prop values
    static defaultProps = {
        type: 'Circle',
        color: '#FC0000',
    };

    //Component's states
    state = {
        ...INITIAL_STATE,
    };

    constructor (props) {
        super(props);
    }

    render() {
        const { type, color } = this.props;
        return (
            <View>
                <Spinner
                    style={{ width: 50, height: 50, alignSelf: 'center' }}
                    isVisible={true}
                    type={type}
                    color={color}
                />
            </View>
        );
    }
}
export default Loading;
