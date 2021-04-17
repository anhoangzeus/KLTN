import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemImage: {
        width: SIZE.DEVICE_WIDTH / 5,
        height: SIZE.DEVICE_HEIGHT / 8,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: 5,
    },
    itemName: {
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
        marginRight: SIZE.DEVICE_WIDTH / 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10,
    },
    itemContainer1: {
        width: SIZE.DEVICE_WIDTH - 20,
        height: SIZE.DEVICE_HEIGHT / 6,
        borderColor: 'silver',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 2,
        borderRadius: 15,
    },
    centeredView: {
        justifyContent: 'center',
        flex: 1,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: SIZE.DEVICE_HEIGHT / 1.5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#a2459a',
        fontWeight: 'bold',
    },
    ModelContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    btnClose: {
        width: SIZE.DEVICE_WIDTH / 6,
    },
});
