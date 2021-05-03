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
import moment from 'moment';
// import SCENE_NAMES from 'constants/sceneName';

const { width, height } = Dimensions.get('screen');


class ChatBoxContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            onInputChat: false,
        };
    }
    chatMessage = ({ item }) => {
        return (
            item.Type === 'CUS' ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.messageView}>
                        <Text style={styles.messText}>{item.Text}</Text>
                    </View>
                    <Text style={{ ...styles.messTime, marginRight: normalize(20) }}>{moment.unix(item.CreatedTime).format('hh:mm MM-DD-YY')}</Text>
                </View>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...styles.messTime, marginLeft: normalize(20) }}>{moment.unix(item.CreatedTime).format('hh:mm MM-DD-YY')}</Text>
                    <View style={{ ...styles.messageView, backgroundColor: '#0084ff' }}>
                        <Text style={{ ...styles.messText, color: '#fff' }}>{item.Text}</Text>
                    </View>
                </View>
        );
    }
    render() {
        const { Name, listchat, textchat, onChangeText, sentMessage } = this.props;
        const { onInputChat } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => { NavigationServices.goBack(); }}
                        style={styles.cartContainer}>
                        <FontAwesome name="angle-left" size={30} color="#fff" style={styles.maginIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{Name}</Text>
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
                        data={listchat}
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
                            value={textchat}
                            onChangeText={(val) => { onChangeText(val); }}
                            onFocus={() => { }}
                            onBlur={() => { }}
                        />
                        <TouchableOpacity
                            onPress={() => sentMessage()}
                        >
                            <Image source={require('../../../assets/images/ic_sendmess.png')} style={styles.iconsend} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default ChatBoxContainer;
