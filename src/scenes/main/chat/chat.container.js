/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ChatView from './chat.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
const functionsCounter = new Set();

export default function ChatContainer({ navigation }) {
    return (
        <ChatView />
    );
}
