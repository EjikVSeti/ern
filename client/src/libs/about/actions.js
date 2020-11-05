import { infoData } from './about';

export const ABOUT_STARTED = 'ABOUT_STARTED';
export const ABOUT_SUCCESS = 'ABOUT_SUCCESS';
export const ABOUT_ERROR = 'ABOUT_ERROR';

export const about = () => {
  return async dispatch => {
    dispatch({ type: ABOUT_STARTED });
    try {
      const { success, info, message } = await infoData();
      if (success) {
        dispatch({ type: ABOUT_SUCCESS, info });
      } else {
        dispatch({ type: ABOUT_ERROR, error: message });
      }
    } catch (e) {
      dispatch({ type: ABOUT_ERROR, error: e.message || 'Something went wrong' });
    }

  }
}
