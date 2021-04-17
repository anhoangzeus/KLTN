import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RatingDoneView from './ratingdone.view';

const functionsCounter = new Set();

const RatingDoneContainer = () => {
    const [ListProduct, setListProduct] = useState([]);
    const [modalVisible, setmodalVisible] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [RatingInfor, setRatingInfor] = useState({});

    const getInfor = (ProductID, OrderDetailID) => {
        database().ref('/Products/' + ProductID + '/Rating/' + OrderDetailID).once('value').then((snapshot) => {
            setRatingInfor({
                Comment: snapshot.val().Comment,
                Date: snapshot.val().Date,
                Point: snapshot.val().Point,
            });
        });
    };
    const getListOrder = () => {
        database().ref('Orders').once('value').then((snapshot) => {
            var items = [];
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().CustomerID === auth().currentUser.uid
                    && childSnapshot.val().Status === '4') {
                    childSnapshot.child('OrderDetails').forEach((child) => {
                        if (child.val().Status === true) {
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
            setrefreshing(false);
        });
    };
    useEffect(() => {
        getListOrder();
    }, []);

    const _onRefresh = () => {
        setrefreshing(true);
        getListOrder();
    };

    functionsCounter.add(_onRefresh);
    functionsCounter.add(getInfor);
    return (
        <RatingDoneView
            _onRefresh={_onRefresh}
            getInfor={getInfor}
            setmodalVisible={setmodalVisible}
            ListProduct={ListProduct}
            modalVisible={modalVisible}
            refreshing={refreshing}
            RatingInfor={RatingInfor}
        />
    );
};
export default RatingDoneContainer;
