import { StyleSheet } from 'react-native';
// eslint-disable-next-line no-unused-vars
import SIZE from 'constants/size';

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
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartContainer: {
        paddingHorizontal: 20,
    },
});
