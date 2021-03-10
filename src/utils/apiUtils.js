import axios from 'axios';

const REQUEST_TIMEOUT = 60000;

export default class APIUtils {
  accessTokenUser = '';
  static setAccessToken(token) {
    this.accessTokenUser = token;
    this.accessToken = `Bearer ${token}`;
  }

  static getAccessToken() {
    return this.accessToken;
  }

  static get(uri, params, headers) {
    console.log('>>>>>params', params);
    return new Promise((resolve, reject) =>
      axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
          params,
        })
        .then((response) => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
        })
        .catch((err) => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }

  static post(uri, postData, headers) {
    return new Promise((resolve, reject) => {
      console.log('>>>>>>> Request post>>>>>> : ', postData);
      axios
        .post(uri, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
        })
        .then((response) => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          // if (data && data.status) {
          resolve(data);
          // } else {
          //   reject(handleErrorMessage(response.data));
          // }
        })
        .catch((err) => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static postFormData(uri, postData) {
    const form_data = new FormData();
    for (let key in postData) {
      form_data.append(key, postData[key]);
    }
    // console.log('>>>>>>> Request>>>>>> : ', postData);
    return new Promise((resolve, reject) => {
      axios
        .post(uri, form_data, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.accessToken,
          },
        })
        .then((response) => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
        })
        .catch((err) => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static put(uri, updateData) {
    return new Promise((resolve, reject) =>
      axios
        .put(uri, updateData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
          },
        })
        .then((response) => {
          const {data} = response;
          resolve(data);
        })
        .catch((err) => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }
}
