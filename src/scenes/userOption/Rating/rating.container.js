import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RatingView from './rating.view';

const functionsCounter = new Set();

const Rating = () => {

    const [ListProduct, setListProduct] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [idvoted, setIdvoted] = useState('');
    const [orderid, setOrderid] = useState('');
    const [orderdetailid, setOrderdetailid] = useState('');
    const [textCmt, settextCmt] = useState('Chưa có bình luận...');
    const [refreshing, setRefreshing] = useState(false);
    const [points, setpoints] = useState(3);
    const [loading, setloading] = useState(true);
    const [modalVisibleSuccess, setmodalVisibleSuccess] = useState(false);

    const GetCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var gio = new Date().getHours();
        var phut = new Date().getMinutes();
        var giay = new Date().getSeconds();
        return date + '/' + month + '/' + year + ' ' + gio + ':' + phut + ':' + giay;
    };


    const getRatingPoint = (ProductID, OrderId, OrderDetailsId) => {
        // database().ref('Products/' + ProductID).child('Rating').once('value').then((snapshot) => {
        //     snapshot.forEach((child) => {
        //         if (child.val().Point === '1') { points1++; }
        //         else if (child.val().Point === '2') { points2++; }
        //         else if (child.val().Point === '3') { points3++; }
        //         else if (child.val().Point === '4') { points4++; }
        //         else if (child.val().Point === '5') { points5++; }
        //     });

        // });
        setIdvoted(ProductID);
        setOrderid(OrderId);
        setOrderdetailid(OrderDetailsId);
    };
    const votedProduct = async () => {
        var date = this.GetCurrentDate();
        var uid = auth().currentUser.uid;
        var username = '';
        var Avatar = '';
        await (database().ref('Users').child(uid).once('value').then((snapshot) => {
            username = snapshot.val().FullName;
            Avatar = snapshot.val().Avatar;
        }));
        database().ref('Products/' + idvoted).child('/Rating/' + orderdetailid).set({
            Date: date,
            Point: points,
            UserId: uid,
            Comment: textCmt,
            UserName: username,
            Avatar: Avatar,
        });
        database().ref('Orders/' + orderid + '/OrderDetails/' + orderdetailid).update({
            Status: true,
        }).then(setModalVisible(false));
        setmodalVisibleSuccess(true);
    };
    const handleChange = (val) => {
        settextCmt(val);
    };
    const getListOrder = () => {
        database().ref('Orders').once('value').then((snapshot) => {
            var items = [];
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().CustomerID === auth().currentUser.uid
                    && childSnapshot.val().Status === '4') {
                    childSnapshot.child('OrderDetails').forEach((child) => {
                        if (child.val().Status === false) {
                            items.push({
                                id: child.val().OrderDetailID,
                                ProductId: child.val().ProductID,
                                Name: child.val().Name,
                                Picture: child.val().Picture,
                                Price: child.val().Price,
                                CategoryID: child.val().CategoryID,
                                BrandID: child.val().BrandID,
                                OrderID: childSnapshot.val().OrderID,
                                Payment: childSnapshot.val().Payment,
                                CreatedDate: childSnapshot.val().CreatedDate,
                            });
                        }
                    });
                }
            });
            setListProduct(items);
            setRefreshing(false);
            setloading(false);
        });
    };
    const setModalTimeOut = (visible) => {
        setmodalVisibleSuccess(visible, () => { setTimeout(setmodalVisibleSuccess(false, 3000)); });
        getListOrder();
    };
    const ratingCompleted = (rating) => {
        setpoints(rating);
    };
    useEffect(() => {
        getListOrder();
    }, []);
    const _onRefresh = () => {
        setRefreshing(true);
        getListOrder();
    };
    functionsCounter.add(_onRefresh);
    functionsCounter.add(handleChange);
    functionsCounter.add(votedProduct);
    functionsCounter.add(setModalTimeOut);
    functionsCounter.add(ratingCompleted);
    functionsCounter.add(GetCurrentDate);
    functionsCounter.add(getRatingPoint);
    return (
        <RatingView
            setModalVisible={setModalVisible}
            _onRefresh={_onRefresh}
            handleChange={handleChange}
            votedProduct={votedProduct}
            setModalTimeOut={setModalTimeOut}
            ratingCompleted={ratingCompleted}
            ListProduct={ListProduct}
            modalVisible={modalVisible}
            refreshing={refreshing}
            GetCurrentDate={GetCurrentDate}
            loading={loading}
            modalVisibleSuccess={modalVisibleSuccess}
            getRatingPoint={getRatingPoint}
            getListOrder={getListOrder}
        />
    );
};

export default Rating;

