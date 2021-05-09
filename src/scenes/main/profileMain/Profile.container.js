import React, {useState} from 'react';
import ProfileMainView from './Profile.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

function ProfileMainContainer({navigation}) {
  const [FullName, setFullName] = useState('username');
  const [Email, setEmail] = useState('name@gmail.com');
  const [CreatedDate, setCreatedDate] = useState('dd/mm/yy hh:mm AM');
  const [Avatar, setAvatar] = useState(
    'https://i.ibb.co/HDzz1rC/avartarnone.png',
  );
  const [Merchant, setMerchant] = useState(false);

  useState(() => {
    if (auth().currentUser != null) {
      database()
        .ref('Users')
        .child(auth().currentUser.uid)
        .on('value', (snapshot) => {
          setCreatedDate(snapshot.val().CreatedDate);
          setFullName(snapshot.val().FullName);
          setEmail(snapshot.val().Email);
          setAvatar(snapshot.val().Avatar);
          setMerchant(snapshot.val().Merchant);
        });
    }
    console.log('merchant hiện tại', Merchant);
  });

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
