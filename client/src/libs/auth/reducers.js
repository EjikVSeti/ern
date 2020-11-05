import {
  IS_AUTHORIZE_ERROR,
  IS_AUTHORIZE_STARTED,
  IS_AUTHORIZE_SUCCESS,
  LOGIN_ERROR,
  LOGIN_STARTED,
  LOGIN_SUCCESS
} from './actions';

export const AuthReducer = (
  state = {
    isReady: false,
    isAuthenticated: false,
    username: '',
    error: ''
  },
  action
) => {
  switch (action.type) {
    case LOGIN_STARTED:
    case IS_AUTHORIZE_STARTED:
      return {
        ...state,
        username: '',
        isAuthenticated: false,
        isReady: false,
        error: ''
      }
    case LOGIN_SUCCESS:
    case IS_AUTHORIZE_SUCCESS:
      return {
        ...state,
        username: action.username,
        isAuthenticated: action.isAuthenticated,
        isReady: true
      }
    case LOGIN_ERROR:
    case IS_AUTHORIZE_ERROR:
      return {
        ...state,
        error: action.error,
        isAuthenticated: false,
        isReady: true
      }
    default:
      return state;
  }
}
