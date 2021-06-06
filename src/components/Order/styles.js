import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        color: '#000',
        fontSize: 10,
    },
    items: {
        alignItems: 'center',
        width: width * 0.225,
    },
    redPoint: {
        position: 'absolute',
        zIndex: 1,
        minWidth: 10,
        minHeight: 10,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
        right: 27,
        top: 0,
    },
    textRedPoint: {
        color: '#fff',
        fontSize: 8,
    },
});
