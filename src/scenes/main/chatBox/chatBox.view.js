/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
    Dimensions, FlatList,
    Image, Text,
    TextInput, View, TouchableOpacity,
} from 'react-native';
import NavigationServices from 'utils/navigationServices';
import { normalize } from 'react-native-elements';
import styles from './chatBox.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SCENE_NAMES from 'constants/sceneName';

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
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => { NavigationServices.goBack(); }}
                        style={styles.cartContainer}>
                        <FontAwesome name="angle-left" size={30} color="#fff" style={styles.maginIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{userid}</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity>
                            <MaterialIcons name="call" size={25} color="#fff" style={styles.iconimg} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="videocam" size={25} color="#fff" style={styles.iconimg} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="md-ellipsis-vertical" size={25} color="#fff" style={styles.iconimg} />
                        </TouchableOpacity>
                    </View>
                </View>
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
                        <TouchableOpacity>
                            <Image source={require('../../../assets/images/ic_sendmess.png')} style={styles.iconsend} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default ChatBoxContainer;
