import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
    proHotContainer1: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        height: SIZE.DEVICE_HEIGHT / 2.8,
    },
    proHotContainer2: {
        flexDirection: 'row',
        marginTop: 5,
    },
    hotimgtype2: {
        width: SIZE.DEVICE_WIDTH / 3.5,
        height: SIZE.DEVICE_HEIGHT / 6.7,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        resizeMode: 'contain',
    },
    tophotimg1: {
        width: SIZE.DEVICE_WIDTH / 3,
        height: SIZE.DEVICE_HEIGHT / 3.285,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        resizeMode: 'cover',
    },
    hotimgtype1: {
        width: SIZE.DEVICE_WIDTH / 3.5,
        height: SIZE.DEVICE_HEIGHT / 6.7,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        marginTop: 5,
        resizeMode: 'contain',
    },
    decide: {
        marginLeft: 5,
    },
    txtSize: {
        fontSize: 17,
        color: 'black',
    },
});
