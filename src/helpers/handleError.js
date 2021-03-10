import {getString} from 'utils/i18n';

export function handleErrorMessage(err) {
  const {response} = err;
  if (response) {
    const {code, message} = response.data || {};
    if (!message) {
      return {
        code: code,
        message: getString('message.ERROR_OCCURRED'),
        status: code,
      };
    }
    return {
      code: code,
      message: message,
      status: code,
    };
  }
  const strMessage = getString(`message.${err.code}`);
  return {
    code: err.code,
    message: !strMessage.includes(err.code)
      ? strMessage
      : getString('message.ERROR_OCCURRED'),
    status: 0,
  };
}
