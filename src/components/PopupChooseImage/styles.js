import { StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#2B4F8C',
        height: normalize(40),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    title: {
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
    },
    btnChoose: {
        width: '100%',
        paddingVertical: 10,
        borderBottomColor: '#DADADA',
        borderBottomWidth: 1,
    },
});
