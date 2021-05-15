const chooseImageOptions = {
    quality: 1.0,
    maxWidth: 1024,
    maxHeight: 1024,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    mediaType: 'photo',
    cameraType: 'back',
    allowsEditing: true,
    includeBase64: false,
};

export {
    chooseImageOptions,
};
