import { StyleSheet, Dimensions } from 'react-native';
import { normalize } from 'react-native-elements';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        width: width * 0.83,
        height: width * 0.875,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: normalize(20),
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#2B4F8C',
        textAlign: 'center',
    },
    textContent: {
        fontWeight: '500',
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
    },
    textButton: {
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
    },
    btnConfirm: {
        width: width * 0.747,
        height: width * 0.1387,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 48,
        backgroundColor: '#2B4F8C',
    },
    iconClose: {
        marginLeft: width * 0.65,
        width: normalize(40),
        height: normalize(40),
        padding: normalize(10),
    },
});
