import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';

export default StyleSheet.create({
    itemContainer: {
        width: SIZE.DEVICE_WIDTH / 2,
        height: SIZE.DEVICE_HEIGHT / 2.8,
        borderColor: 'silver',
        borderWidth: 1,
    },
    itemImage: {
        width: SIZE.DEVICE_WIDTH / 2.5,
        height: SIZE.DEVICE_HEIGHT / 4,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    itemName: {
        fontSize: 14,
        color: 'black',
        marginHorizontal: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10,
    },
    priceColor: {
        color: 'red',
    },
    starView: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    boughColor: {
        color: 'green',
    },
});
