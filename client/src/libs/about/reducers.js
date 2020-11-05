import {
  ABOUT_STARTED,
  ABOUT_SUCCESS,
  ABOUT_ERROR
} from './actions';

export const AboutReducer = (
  state = {
    isReady: false,
    info: '',
    error: ''
  },
  action
) => {
  switch (action.type) {
    case ABOUT_STARTED:
      return {
        ...state,
        isReady: false,
        info: '',
        error: ''
      }
    case ABOUT_SUCCESS:
      return {
        ...state,
        info: action.info,
        isReady: true
      }
    case ABOUT_ERROR:
      return {
        ...state,
        isReady: true
      }
    default:
      return state;
  }
}
