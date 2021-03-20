import {StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
    },
    viewStyle:{
        width: width / 7, height: height / 15, marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
    },
    imageStyle:{
        width: width / 7, height: height / 16.1,
            marginVertical: 5,
            justifyContent: 'center',
    },
    textStyle :{
        textAlign: 'center', fontWeight: 'bold', color: 'black' ,
    },
});
