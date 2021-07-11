import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import ProfileMainView from './Profile.view';

function ProfileMainContainer({navigation}) {
  const [FullName, setFullName] = useState('username');
  const [Email, setEmail] = useState('name@gmail.com');
  const [CreatedDate, setCreatedDate] = useState('dd/mm/yy hh:mm AM');
  const [Avatar, setAvatar] = useState(
    'https://i.ibb.co/HDzz1rC/avartarnone.png',
  );
  const [Merchant, setMerchant] = useState(1);

  const getData = () => {
    if (auth().currentUser != null) {
      database()
        .ref('Users')
        .child(auth().currentUser.uid)
        .on('value', (snapshot) => {
          setCreatedDate(snapshot.val().CreatedDate);
          setFullName(snapshot.val().FullName);
          setEmail(snapshot.val().Email);
          setAvatar(snapshot.val().Avatar);
          if (snapshot.val().Merchant) {
            database()
              .ref('Brief/' + auth().currentUser.uid)
              .once('value')
              .then((childsnapshot) => {
                if (childsnapshot.val().Status == '2') {
                  setMerchant(2);
                } else {
                  setMerchant(3);
                }
              });
          } else {
            database()
              .ref('Brief/' + auth().currentUser.uid)
              .once('value')
              .then((childsnapshot) => {
                if (childsnapshot.val().Status == '4') {
                  setMerchant(3);
                } else {
                  setMerchant(1);
                }
              });
          }
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProfileMainView
      navigation={navigation}
      FullName={FullName}
      Email={Email}
      CreatedDate={CreatedDate}
      Avatar={Avatar}
      Merchant={Merchant}
    />
  );
}
export default ProfileMainContainer;
