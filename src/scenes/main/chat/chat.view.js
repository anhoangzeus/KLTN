/* eslint-disable react-native/no-inline-styles */

import Header from 'components/Header';
import SCENE_NAMES from 'constants/sceneName';
import moment from 'moment';
import * as React from 'react';
import {
    FlatList,
    Image, SafeAreaView, Text,
    TouchableOpacity, View,
} from 'react-native';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import NavigationServices from 'utils/navigationServices';
import styles from './chat.styles';

const listTest = [
    {
        id: 1,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 2,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 3,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 4,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    }, {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
    {
        id: 5,
        avatar: 'https://i.ibb.co/c66514c/175383481-2804888926430106-2280786548134825274-n.jpg',
        name: 'aaaaaa',
        new_message: 1,
        last_message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        last_messtime: '13:59 30-04-21',
    },
];


class ChatContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            listItem: listTest,
        };
    }
    listChatView = ({ item }) => {
        console.log(moment().unix());
        return (
            <TouchableOpacity
                onPress={() => { NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, { id: item.id, Name: item.Name }); }}
                style={styles.itemMessView}>
                <View>
                    <Image source={{ uri: item.Avatar }} style={styles.avatar} />
                    {item.Status > 0 &&
                        <View style={styles.redPoint}>
                            <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{item.Status}</Text>
                        </View>}
                </View>
                <View style={{ marginRight: normalize(70) }}>
                    <Text style={styles.textName}>{item.Name}</Text>
                    <Text>{item.LastMess}</Text>
                </View>
                <Text style={styles.textTime}>{moment.unix(item.LastMessTime).format('hh:mm MM-DD-YY')}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        const { listChat } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Header title="Chat" isCart={true} />
                <TouchableOpacity style={styles.searchView}>
                    <Text style={styles.text}><Icon name="search1" size={20} color="#000" />  Tìm kiếm</Text>
                </TouchableOpacity>
                <FlatList
                    data={listChat}
                    renderItem={({ item }) =>
                        <this.listChatView item={item} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        );
    }
}
export default ChatContainer;
