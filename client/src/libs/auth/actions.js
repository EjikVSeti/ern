import { isAuthorize, userLogin } from './auth';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const IS_AUTHORIZE_STARTED = 'IS_AUTHORIZE_STARTED';
export const IS_AUTHORIZE_SUCCESS = 'IS_AUTHORIZE_SUCCESS';
export const IS_AUTHORIZE_ERROR = 'IS_AUTHORIZE_ERROR';

export const authorization = () => {
  return async dispatch => {
    dispatch({ type: IS_AUTHORIZE_STARTED });
    try {
      const { success, isAuthenticated, username, message } = await isAuthorize();
      if (success) {
        dispatch({ type: IS_AUTHORIZE_SUCCESS, isAuthenticated, username });
      } else {
        dispatch({ type: IS_AUTHORIZE_ERROR, error: message });
      }
    } catch (e) {
      dispatch({ type: IS_AUTHORIZE_ERROR, error: e.message || 'Something went wrong' });
    }

  }
}

export const login = ({ login, password }) => {
  return async dispatch => {
    dispatch({ type: LOGIN_STARTED });
    try {
      const { success, isAuthenticated, username, message } = await userLogin({ login, password });
      if (success) {
        dispatch({ type: LOGIN_SUCCESS, isAuthenticated, username });
      } else {
        dispatch({ type: LOGIN_ERROR, error: message || 'Something went wrong' });
      }
    } catch (e) {
      dispatch({ type: LOGIN_ERROR, error: e.message || 'Something went wrong' });
    }
  }
}
