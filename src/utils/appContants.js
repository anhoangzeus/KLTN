export const MessType = {
  Image: 'img',
  Text: 'text',
  MoreImages: 'more_images',
};
export const chooseImageOptions = {
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
export const NotificationConstants = {
  fcmToken: '',
};
export const NOTIFICATION_TYPE = {
  GIAM_GIA: '1',
  TIN_TUC: '2',
  XAC_NHAN: 'XAC_NHAN',
  GIAO_HANG: 'GIAO_HANG',
  DA_GIAO: 'DA_GIAO',
  HUY_DON: 'HUY_DON',
  TRA_HANG: 'TRA_HANG',
  APPROVE_STORE: 'APPROVE_STORE',
  REFUSE_STORE: 'REFUSE_STORE',
  PRODUCT: 'PRODUCT',
};
