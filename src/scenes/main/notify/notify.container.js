/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import NotifyView from './notify.view';
const functionsCounter = new Set();

export default function NotifyContainer({ navigation }) {

    const [listThongBao, setlistThongBao] = useState([]);
    const [listOrder, setlistOrder] = useState([]);
    const [loading, isLoading] = useState(false);
    const [ischoose, setIschoose] = useState(1);
    const [refreshing, isRefreshing] = useState(false);
    const [redPoint1, isredPoint1] = useState(false);
    const [redPoint2, isredPoint2] = useState(false);
    const [redPoint3, isredPoint3] = useState(false);

    const GetCurrentDate = () => {
        var date = moment().format('dd--MM-yyyy hh:mm:ss');
        return date;
    };

    const getlistOrder = () => {
        database().ref('Orders').once('value').then((snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                if (auth().currentUser) {
                    if (child.val().CustomerID === auth().currentUser.uid) {
                        items.push(child.val());
                    }
                }
            });
            setlistOrder(items);
            isRefreshing(false);
        });
    };
    const getThongBao = () => {
        var uid = '';
        if (auth().currentUser) {
            uid = auth().currentUser.uid;
        }
        database().ref('Announces').once('value').then((snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                if (child.val().Status === 'True') {
                    if (ischoose === 2) {
                        if (child.val().Type === '2') {
                            items.push({
                                Id: child.val().Id,
                                Details: child.val().Details,
                                Title: child.val().Title,
                                CreatedDate: child.val().CreatedDate,
                                Type: child.val().Type,
                                Url: child.val().Url,
                                isShow: child.child('Users').hasChild(uid),
                            });
                            if (child.child('Users').hasChild(uid) === false) {
                                isredPoint2(true);
                                isredPoint3(true);
                            }
                        }
                    } else if (ischoose === 3) {
                        if (child.val().Type === '1') {
                            items.push({
                                Id: child.val().Id,
                                Details: child.val().Details,
                                Title: child.val().Title,
                                CreatedDate: child.val().CreatedDate,
                                Type: child.val().Type,
                                Url: child.val().Url,
                                isShow: child.child('Users').hasChild(uid),
                            });
                            if (child.child('Users').hasChild(uid) === false) {
                                isredPoint1(true);
                                isredPoint3(true);
                            }
                        }
                    } else if (ischoose === 1) {
                        items.push({
                            Id: child.val().Id,
                            Details: child.val().Details,
                            Title: child.val().Title,
                            CreatedDate: child.val().CreatedDate,
                            Type: child.val().Type,
                            Url: child.val().Url,
                            isShow: child.child('Users').hasChild(uid),
                        });
                        if (child.child('Users').hasChild(uid) === false) {
                            isredPoint3(true);
                            if (child.val().Type === '1') {
                                isredPoint1(true);
                            } else {
                                isredPoint2(true);
                            }
                        }
                    }
                }
            });
            items.sort(function (a, b) {
                return (a.isShow === b.isShow) ? 0 : b.isShow ? -1 : 1;
            });
            setlistThongBao(items);
            isLoading(false);
            isRefreshing(false);
        });
    };
    const setStateNotigication = (id) => {
        isredPoint1(true);
        isredPoint2(true);
        isredPoint3(true);
        if (auth().currentUser) {
            database().ref('/Announces/' + id).child('/Users/').child(auth().currentUser.uid).update({
                Date: GetCurrentDate(),
                Status: true,
            });
            getThongBao();
        }
    };
    const _onRefresh = () => {
        isRefreshing(true);
        isredPoint1(false);
        isredPoint2(false);
        isredPoint3(false);
        getThongBao();
        getlistOrder();
    };
    useEffect(() => {
        getlistOrder();
        getThongBao();
    }, [ischoose]);
    functionsCounter.add(setStateNotigication);
    functionsCounter.add(setIschoose);
    functionsCounter.add(_onRefresh);
    functionsCounter.add(getlistOrder);
    return (
        <NotifyView
            listThongBao={listThongBao}
            listOrder={listOrder}
            loading={loading}
            ischoose={ischoose}
            refreshing={refreshing}
            redPoint1={redPoint1}
            redPoint2={redPoint2}
            redPoint3={redPoint3}
            setStateNotigication={setStateNotigication}
            _onRefresh={_onRefresh}
            setIschoose={setIschoose}
            navigation={navigation}
            getlistOrder={getlistOrder}
        />
    );
}
