import React, {useEffect, useState} from 'react';
import MyStoreOption from './mystoreOption.view';

// import {getParams} from 'utils/navigationServices';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function MyStoreOptionContainer({navigation, route}) {
  //const { Avatar, FullName } = getParams(route);
  const [Avatar, setAvatar] = useState('');
  const [FullName, setFullName] = useState('');

  useEffect(() => {
    database()
      .ref('Users/' + auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        setAvatar(snapshot.val().Avatar);
        setFullName(snapshot.val().FullName);
      });
  }, []);
  return <MyStoreOption Avatar={Avatar} FullName={FullName} />;
}
