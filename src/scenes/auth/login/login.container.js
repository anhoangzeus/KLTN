import React from 'react';
import LoginView from './login.view';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
// import { GoogleSignin } from '@react-native-community/google-signin';
const functionsCounter = new Set();

function LoginContainer({ navigation }) {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        CreateDate: '06/11/2020',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        modalVisibleWarning: false,
        modalReset: false,
        textAlert: '',
        textChangPass: '',
    });
    const textInputChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6
        ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };
    const handleTextChangpass = (val) => {
        setData({
            ...data,
            textChangPass: val,
        });
    };
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const handleValidUser = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };
    const handleClose = () => {
        setData({
            ...data,
            modalVisibleWarning: false,
        });
    };
    const setModalVisibleWarning = (visible, text) => {
        setData({
            ...data,
            modalVisibleWarning: visible,
            textAlert: text,
        }, setTimeout(handleClose, 2000));
    };
    const setModalResetPass = (visible) => {
        setData({
            ...data,
            modalReset: visible,
        });
    };
    const handleResetPass = () => {
        setData({
            ...data,
            modalReset: false,
            textChangPass: '',
        });
    };
    // function GetCurrentDate() {
    //     var date = new Date().getDate();
    //     var month = new Date().getMonth() + 1;
    //     var year = new Date().getFullYear();
    //     var gio = new Date().getHours();
    //     var phut = new Date().getMinutes();
    //     var giay = new Date().getSeconds();
    //     return date + '/' + month + '/' + year + ' ' + gio + ':' + phut + ':' + giay;
    // }
    const loginHandle = () => {
        if (data.username.length < 6 || data.password.length < 6) {
            setModalVisibleWarning(true, 'Quý khách chưa nhập đầy đủ thông tin');
            return;
        }
        database().ref('Users').on('value', snapshot => {
            var temp = false;
            snapshot.forEach((child) => {
                if (child.val().UserName === data.username) {
                    temp = true;
                    if (child.val().Passwords === data.password) {
                        auth().signInWithEmailAndPassword(child.val().email, data.password)
                            .then(() => {
                                console.log('login');
                            })
                            .catch(function (error) {
                                setModalVisibleWarning(true, 'Quý khách vui lòng kiểm tra lại Internet');
                                return;
                            });
                    } else {
                        setModalVisibleWarning(true, 'Mật khẩu không chính xác');
                    }
                }
            });
            if (temp === false) {
                setModalVisibleWarning(true, 'Tài khoản không tồn tại');
            }
        });
    };
    // const loginFacebook = async () => {
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    //     if (result.isCancelled) {
    //         setModalVisibleWarning(true, 'Huỷ đăng nhập');
    //     }
    //     const data1 = await AccessToken.getCurrentAccessToken();
    //     if (!data1) {
    //         setModalVisibleWarning(true, 'Lỗi đăng nhập!!!');
    //     }
    //     const facebookCredential = auth.FacebookAuthProvider.credential(data1.accessToken);
    //     var CreateDate = GetCurrentDate();
    //     auth().signInWithCredential(facebookCredential).then(() => {
    //         database().ref('Users').child(auth().currentUser.uid).update({
    //             Avatar: auth().currentUser.photoURL,
    //             CMND: '',
    //             CreatedBy: auth().currentUser.displayName,
    //             CreatedDate: CreateDate,
    //             Email: auth().currentUser.email != null ? auth().currentUser.email : '',
    //             FullName: auth().currentUser.displayName,
    //             Phone: auth().currentUser.phoneNumber,
    //             Status: true,
    //             UserID: auth().currentUser.uid,
    //         }).catch(error => {
    //             setModalVisibleWarning(true, error);
    //         });
    //     });
    // };
    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '933734030914-3v0h6jlkrpqtm58llk0qgnqgsiee2vs5.apps.googleusercontent.com',
    //         scopes: ['https://www.googleapis.com/auth/userinfo.email'],
    //         offlineAccess: true,
    //         forceCodeForRefreshToken: false,
    //     });
    // }, []);
    // const loginGoogle = async () => {
    //     const { idToken } = await GoogleSignin.signIn();
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //     var CreateDate = GetCurrentDate();
    //     auth().signInWithCredential(googleCredential)
    //         .then(() => {
    //             database().ref('Users').child(auth().currentUser.uid).update({
    //                 Avatar: auth().currentUser.photoURL,
    //                 CMND: '',
    //                 CreatedBy: auth().currentUser.displayName,
    //                 CreatedDate: CreateDate,
    //                 Email: auth().currentUser.email != null ? auth().currentUser.email : '',
    //                 FullName: auth().currentUser.displayName,
    //                 Phone: auth().currentUser.phoneNumber,
    //                 Status: true,
    //                 UserID: auth().currentUser.uid,
    //             }).catch(error => {
    //                 setModalVisibleWarning(true, error);
    //             });
    //         });
    // };
    const sentPass = () => {
        if (data.textChangPass === '') {
            setModalVisibleWarning(true, 'Bạn chưa nhập Email');
        } else {
            try {
                auth()
                    .sendPasswordResetEmail(data.textChangPass)
                    .then(() => {
                        setModalVisibleWarning(true, 'Kiểm tra tài khoản Email của bạn');
                        handleResetPass();
                    })
                    // eslint-disable-next-line handle-callback-err
                    .catch(err => {
                        handleResetPass();
                        setModalVisibleWarning(true, 'Email chưa được đăng kí');
                    });
            } catch {

            }
        }

    };
    functionsCounter.add(textInputChange);
    functionsCounter.add(handlePasswordChange);
    functionsCounter.add(handleTextChangpass);
    functionsCounter.add(updateSecureTextEntry);
    functionsCounter.add(handleValidUser);
    functionsCounter.add(setModalResetPass);
    functionsCounter.add(loginHandle);
    functionsCounter.add(handleResetPass);
    // functionsCounter.add(loginFacebook);
    // functionsCounter.add(loginGoogle);
    functionsCounter.add(sentPass);
    return (
        <LoginView
            navigation={navigation}
            textInputChange={textInputChange}
            handlePasswordChange={handlePasswordChange}
            handleTextChangpass={handleTextChangpass}
            updateSecureTextEntry={updateSecureTextEntry}
            handleValidUser={handleValidUser}
            setModalResetPass={setModalResetPass}
            loginHandle={loginHandle}
            handleResetPass={handleResetPass}
            // loginFacebook={loginFacebook}
            // loginGoogle={loginGoogle}
            sentPass={sentPass}
            data={data}
        />
    );
}
export default LoginContainer;
