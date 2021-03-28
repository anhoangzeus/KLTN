import React, { useCallback, useState } from 'react';
import ProfileView from './Profile.view';
import { openImagePickerAndResize } from 'helpers/imagePicker';
const functionsCounter = new Set();
export default function ProfileContainer({ navigation }) {
  const [urlAvatar, setUrlAvatar] = useState('');
  const onPressAvatar = useCallback(() => {
    openImagePickerAndResize((err, res) => {
      console.log('>>>>openImagePickerAndResize', { err, res });
      if (!err) {
        setUrlAvatar(res.uri);
      }
    });
  }, []);

  functionsCounter.add(onPressAvatar);
  return (
    <ProfileView
      urlAvatar={urlAvatar}
      onPressAvatar={onPressAvatar}
      navigation={navigation}
    />
  );
}
