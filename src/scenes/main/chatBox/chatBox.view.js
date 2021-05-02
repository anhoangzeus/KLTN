/* eslint-disable react-native/no-inline-styles */

import Header from 'components/Header';
import * as React from 'react';
import {
    Dimensions, FlatList,
    Image, Text,
    TextInput, View,
} from 'react-native';
import { normalize } from 'react-native-elements';
import styles from './chatBox.styles';

const { width, height } = Dimensions.get('screen');
const listTest = [
    {
        id: 1,
        userType: 'CUSTOMER',
        content: '안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 감사합니다.',
        time: '12:48 05-02-21',
    },
    {
        id: 2,
        userType: 'USER',
        content: '안녕하세요. 궁금한 점들이 있습니다. 문의드려도 될까요?',
        time: '12:50 05-02-21',
    },
    {
        id: 3,
        userType: 'CUSTOMER',
        content: '안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 감사합니다.',
        time: '12:52 05-02-21',
    },
    {
        id: 4,
        userType: 'USER',
        content: '안녕하세요. 궁금한 점들이 있습니다. 문의드려도 될까요?',
        time: '13:00 05-02-21',
    },
    {
        id: 5,
        userType: 'CUSTOMER',
        content: '안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 안녕하세요. (주)정리정리의 김사장입니다. 감사합니다.',
        time: '13:52 05-02-21',
    },
    {
        id: 6,
        userType: 'USER',
        content: '안녕하세요. 궁금한 점들이 있습니다. 문의드려도 될까요?',
        time: '13:55 05-02-21',
    },
];

class ChatBoxContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ListChat: listTest,
            onInputChat: false,
        };
    }
    chatMessage = ({ item }) => {
        return (
            item.userType === 'CUSTOMER' ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.messageView}>
                        <Text style={styles.messText}>{item.content}</Text>
                    </View>
                    <Text style={{ ...styles.messTime, marginRight: normalize(20) }}>{item.time}</Text>
                </View>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...styles.messTime, marginLeft: normalize(20) }}>{item.time}</Text>
                    <View style={styles.messageView}>
                        <Text style={styles.messText}>{item.content}</Text>
                    </View>
                </View>
        );
    }
    render() {
        const { userid } = this.props;
        const { ListChat, onInputChat } = this.state;
        return (
            // Truyen id consultant vao toptitle
            <View style={{ flex: 1 }}>
                <Header title={userid} />
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={ListChat}
                        renderItem={({ item }) =>
                            <this.chatMessage item={item} />
                        }
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={
                            <View style={{ height: normalize(30) }} />
                        }
                    />
                </View>
                <View style={{ ...styles.containerComposize, height: onInputChat ? width * 0.24 : height * 0.07 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.vChat}
                            placeholder={'Soạn tin...'}
                            placeholderTextColor={'#000'}
                            multiline={true}
                            onFocus={() => { }}
                            onBlur={() => { }}
                        />
                        <Image source={require('../../../assets/images/ic_sendmess.png')} style={{ ...styles.iconsend }} />
                    </View>
                </View>
            </View>
        );
    }
}
export default ChatBoxContainer;
