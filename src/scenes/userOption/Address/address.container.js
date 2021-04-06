import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AddressView from './address.view';

const functionsCounter = new Set();
export default function AddressContainer({ navigation }) {

    const [listAddress, setListAddress] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setloading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [_idCanXoa, set_idCanXoa] = useState('');
    const [isMain, setIsMain] = useState(false);


    const ListenForListAddress = () => {
        database().ref('ListAddress').child(auth().currentUser.uid)
            .once('value').then((snapshot) => {
                var items = [];
                var items1 = [];
                snapshot.forEach(function (childSnapshot) {
                    var Address = {
                        ShipName: '',
                        ShipPhone: '',
                        NumberAddress: '',
                        Xa: '',
                        Huyen: '',
                        City: '',
                        ListID: '',
                        Main: false,
                    };
                    var Address1 = {
                        ShipName: '',
                        ShipPhone: '',
                        NumberAddress: '',
                        Xa: '',
                        Huyen: '',
                        City: '',
                        ListID: '',
                        Main: true,
                    };
                    if (childSnapshot.val().Main === true) {
                        Address1.ShipName = childSnapshot.val().ShipName;
                        Address1.ShipPhone = childSnapshot.val().ShipPhone;
                        Address1.NumberAddress = childSnapshot.val().NumberAddress;
                        Address1.Xa = childSnapshot.val().Xa;
                        Address1.Huyen = childSnapshot.val().Huyen;
                        Address1.City = childSnapshot.val().City;
                        Address1.ListID = childSnapshot.val().ListID;
                        items1.push(Address1);
                    } else {
                        Address.ShipName = childSnapshot.val().ShipName;
                        Address.ShipPhone = childSnapshot.val().ShipPhone;
                        Address.NumberAddress = childSnapshot.val().NumberAddress;
                        Address.Xa = childSnapshot.val().Xa;
                        Address.Huyen = childSnapshot.val().Huyen;
                        Address.City = childSnapshot.val().City;
                        Address.ListID = childSnapshot.val().ListID;
                        items.push(Address);
                    }
                });
                var list = items1.concat(items);
                setListAddress(list);
                setloading(false);
                if (items1[0].ListID === '') {
                    setStatus(false);
                } else {
                    setStatus(true);
                }
            });
    };
    const _deleteAddress = () => {
        if (isMain === false) {
            database().ref('ListAddress').child(auth().currentUser.uid).child(_idCanXoa).remove();
        }
        setModalVisible(false);
        ListenForListAddress();
    };
    useEffect(() => {
        ListenForListAddress();
    }, []);

    functionsCounter.add(_deleteAddress);

    return (
        <AddressView
            _deleteAddress={_deleteAddress}
            listAddress={listAddress}
            status={status}
            loading={loading}
            modalVisible={modalVisible}
            set_idCanXoa={set_idCanXoa}
            setIsMain={setIsMain}
            setModalVisible={setModalVisible}
        />
    );
}
