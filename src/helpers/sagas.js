import {put, select} from 'redux-saga/effects';
import {getIsConnectedSelector} from 'appRedux/selectors/connectSelector';
import {
  showLoading,
  onFetching,
  nonFetching,
  hideLoading,
} from 'appRedux/actions/loadingActions';
import {handleErrorMessage} from './handleError';
import {getString} from 'utils/i18n';
import {showNotification} from 'components/Modal/ModalNotification';

export function* invoke(execution, handleError, showDialog, actionType) {
  try {
    const isConnected = yield select(getIsConnectedSelector);
    if (!isConnected) {
      showNotification({
        message: getString('message.NOT_INTERNET'),
      });
      return;
    }
    if (showDialog) {
      yield put(showLoading(actionType));
    }
    yield put(onFetching(actionType));
    yield* execution();
    yield put(nonFetching(actionType));
    if (showDialog) {
      yield put(hideLoading(actionType));
    }
  } catch (error) {
    console.info(`Saga Invoke Error [${actionType}]>>>>>`, {error});
    yield put(nonFetching(actionType));
    if (showDialog) {
      yield put(hideLoading(actionType));
    }
    const errorMessage = handleErrorMessage(error);
    if (typeof handleError === 'function') {
      yield handleError(errorMessage);
    } else {
      // yield put(showError(errorMessage));
      yield showNotification({message: errorMessage?.message});
    }
  }
}
