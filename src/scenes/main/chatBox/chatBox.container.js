/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ChatBoxView from './chatBox.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import NavigationServices, { getParams } from 'utils/navigationServices';
const functionsCounter = new Set();

export default function ChatBoxContainer({ navigation, route }) {

    const { id } = getParams(route);
    return (
        <ChatBoxView
            userid={id}
        />
    );
}
