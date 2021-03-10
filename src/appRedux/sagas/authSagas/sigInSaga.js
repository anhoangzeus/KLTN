import {put, call} from 'redux-saga/effects';
import {setAccessToken, signInSuccess} from 'appRedux/actions/authActions';
import {signInApi} from 'services/api/authApi';
import {invoke} from 'helpers/sagas';
import {parseUserInfo} from 'appRedux/parsers/authParses';
import APIUtils from 'utils/apiUtils';

export function* sigInSaga({payload, type}) {
  const {showLoading = true, callback = () => {}, params} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(signInApi, params);
      const dataParse = parseUserInfo(result);
      const {token} = result;
      APIUtils.setAccessToken(token);
      yield put(setAccessToken(token));
      yield put(signInSuccess(dataParse));
      yield callback(null, dataParse);
    },
    null,
    showLoading,
    type,
  );
}
