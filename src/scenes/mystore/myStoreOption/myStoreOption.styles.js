import size from 'constants/size';
import { StyleSheet } from 'react-native';



export default StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        backgroundColor: '#a2459a',
        paddingBottom: 12,
    },
    avatarContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: size.DEVICE_HEIGHT / 7,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#a2459a',
        borderWidth: 1,
    },
    cartContainer: {
        paddingHorizontal: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemText: {
        flex: 1,
        color: '#1e1e1e',
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    divider: {
        height: 10,
    },
    divider1: {
        height: 1,
    },
});