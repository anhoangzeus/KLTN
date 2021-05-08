import { StyleSheet, Dimensions } from 'react-native';
import { normalize } from 'react-native-elements';
const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        paddingHorizontal: normalize(10),
    },
    messageView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(8),
        alignItems: 'center',
        maxWidth: width * 0.624,
        minWidth: width * 0.15,
        marginTop: normalize(20),
    },
    messageViewUser: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(7),
        width: width * 0.624,
        marginTop: normalize(20),
    },
    messText: {
        fontWeight: '400',
        fontSize: 15,
        color: '#666666',
    },
    messTime: {
        fontWeight: '400',
        fontSize: 8,
        color: 'rgba(138, 138, 142, 1)',
        alignSelf: 'flex-end',
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: '#000',
    },
    textPrice: {
        fontWeight: '500',
        fontSize: 10,
        color: 'rgba(0, 122, 255, 1)',
    },
    btnMess: {
        height: width * 0.08,
        backgroundColor: '#2B4F8C',
        borderRadius: normalize(4),
        marginTop: normalize(12),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: normalize(7),
    },
    containerComposize: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: normalize(20),
    },
    vChat: {
        backgroundColor: '#F4F5F7',
        borderColor: '#DADADA',
        borderWidth: 1,
        borderRadius: normalize(100),
        width: '85%',
        paddingHorizontal: normalize(20),
        paddingRight: normalize(50),
        paddingVertical: 5,
    },
    iconsend: {
        width: width * 0.1,
        height: width * 0.1,
        alignSelf: 'center',
        marginLeft: width * 0.04,
    },
    icon: {
        height: 25, width: 25, marginRight: normalize(8),
    },
    iconimg: {
        marginRight: 2,
        width: normalize(30),
        borderRadius: 5,
        height: normalize(30),
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        backgroundColor: '#2B4F8C',
        justifyContent: 'space-between',
        paddingBottom: 12,

    },
    cartContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
    },
    cartIcon: {
        width: 24,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
});
