/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

// Initial state
const INITIAL_STATE = {};

class Col extends Component {
    // Define prop types
    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

        Component: PropTypes.any,
        leftContent: PropTypes.bool, //All content contained is aligned to left side
        rightContent: PropTypes.bool, //All content contained is aligned to right side
        centerHorizontal: PropTypes.bool, //All content contained is aligned to center side horizontal
        centerVertical: PropTypes.bool, //All content contained is aligned to center side vertically
        center: PropTypes.bool, //It means enableing centerHorizontal and centerVertical at the same time
        fillParent: PropTypes.bool, //Fill all empty space in View
        shrink: PropTypes.bool, // flexShrink: 1
    };

    // Set default prop values
    static defaultProps = {
        leftContent: false,
        rightContent: false,
        centerHorizontal: false,
        centerVertical: false,
        center: false,
        fillParent: false,
        Component: View,
        shrink: false,
    };

    //Component's states
    state = {
        ...INITIAL_STATE,
    };

    constructor (props) {
        super(props);
    }

    render() {
        const { children, style, width, height, leftContent, rightContent, centerHorizontal, centerVertical, center, fillParent, Component, shrink } = this.props;
        const styles = [
            {
                ...(leftContent ? { alignItems: 'flex-start' } : {}),
                ...(rightContent ? { alignItems: 'flex-end' } : {}),
                ...(centerHorizontal ? { alignItems: 'center' } : {}),
                ...(centerVertical ? { justifyContent: 'center' } : {}),
                ...(center ? { justifyContent: 'center', alignItems: 'center' } : {}),
                ...(shrink ? { flexShrink: 1 } : {}),
                ...(fillParent ? { alignSelf: 'stretch', flexGrow: 1, flexShrink: 1 } : {}),
                width,
                height,
            },
            style,
        ];

        return (
            <Component {...this.props} style={[{ width, height }, styles]}>
                {children}
            </Component>
        );
    }
}

export default Col;
