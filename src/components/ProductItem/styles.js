import { StyleSheet } from 'react-native';
import SIZE from 'constants/size';
import { normalize } from 'react-native-elements';

export default StyleSheet.create({
    itemContainer: {
        width: SIZE.DEVICE_WIDTH / 2,
        height: SIZE.DEVICE_HEIGHT / 2.8,
        borderColor: '#E5E5E5',
        borderWidth: 2,
        padding: normalize(5),
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
