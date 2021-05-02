/* eslint-disable react-native/no-inline-styles */

import SCENE_NAMES from 'constants/sceneName';
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
    listChat = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, { id: item.id }); }}
                style={styles.itemMessView}>
                <View>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    {item.new_message > 0 &&
                        <View style={styles.redPoint}>
                            <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{item.new_message}</Text>
                        </View>}
                </View>

                <View style={{ marginLeft: normalize(10) }}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text>{item.last_message}</Text>
                </View>
                <Text style={styles.textTime}>{item.last_messtime}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        const { listItem } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Text style={styles.textTitle}>TIAN CHAT</Text>
                <TouchableOpacity style={styles.searchView}>
                    <Text style={styles.text}><Icon name="search1" size={20} color="#000" />  Tìm kiếm</Text>
                </TouchableOpacity>
                <FlatList
                    data={listItem}
                    renderItem={({ item }) =>
                        <this.listChat item={item} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        );
    }
}
export default ChatContainer;
