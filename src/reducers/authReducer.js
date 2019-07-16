import luss from '../apis/luss';
export const LOGIN_USER = 'luss/LOGIN_USER';
export const FETCH_USER = 'luss/FETCH_USER';

export const login_account = data => async dispatch => {
  dispatch({ type: LOGIN_USER, payload: data });
};

export const fetchUser = accessToken => async dispatch => {
  const response = await luss.get(`/api/luss/user/${accessToken}`);

  dispatch({
    type: FETCH_USER,
    payload: response.data.length ? response.data[0] : null
  });
};

const initialState = {
  user: null,
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
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        accessToken: action.payload ? state.accessToken : null
      };
    default:
      return state;
  }
};
