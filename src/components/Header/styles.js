import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';
export default StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        backgroundColor: '#a2459a',
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    cartContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartIcon: {
        width: SIZE.HEADER_ICON_SIZE,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
});
