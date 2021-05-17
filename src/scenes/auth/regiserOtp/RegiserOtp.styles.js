import size from 'constants/size';
import { StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    btnConfirm: {
        backgroundColor: '#2B4F8C',
        borderRadius: 10,
        width: '50%',
        height: size.DEVICE_HEIGHT / 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(15),
    },
    text: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: normalize(100),
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textbtn: {
        color: 'white',
        fontSize: 18,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        height: size.DEVICE_HEIGHT / 6,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        color: '#2B4F8C',
    },
    modalText1: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        color: 'red',
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
