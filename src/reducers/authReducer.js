import history from '../history';
export const LOGIN_USER = 'luss/LOGIN_USER';

export const login_account = data => async dispatch => {
  dispatch({ type: LOGIN_USER, payload: data });
  history.push('/');
};

const initialState = {
  accessToken: null,
  error: '',
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        accessToken: action.payload
      };
    default:
      return state;
  }
};
