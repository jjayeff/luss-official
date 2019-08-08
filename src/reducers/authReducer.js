import luss from '../apis/luss';
import history from '../history';
export const LOGIN_USER = 'luss/LOGIN_USER';
export const LOGOUT_USER = 'luss/LOGOUT_USER';
export const FETCH_USER = 'luss/FETCH_USER';
export const CREATE_USER = 'luss/CREATE_USER';

export const login_account = data => async dispatch => {
  dispatch({ type: LOGIN_USER, payload: data });
};

export const logout_account = () => async dispatch => {
  dispatch({ type: LOGOUT_USER, payload: null });
  history.push('/');
};

export const fetchUser = accessToken => async dispatch => {
  const response = await luss.get(`/api/luss/user/${accessToken}`);

  dispatch({
    type: FETCH_USER,
    payload: response.data.length ? response.data[0] : null
  });
};

export const createUser = data => async dispatch => {
  const response = await luss.post(`/api/luss/users/create`, data);

  dispatch({ type: CREATE_USER, payload: response.data });

  const response1 = await luss.get(
    `/api/luss/user/${response.data.accessToken}`
  );

  dispatch({
    type: FETCH_USER,
    payload: response1.data.length ? response1.data[0] : null
  });
  localStorage.setItem('Session', JSON.stringify(response.data.accessToken));
  history.push('/products');
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
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        accessToken: null
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        accessToken: action.payload ? state.accessToken : null
      };
    case CREATE_USER:
      return {
        ...state,
        accessToken: action.payload.accessToken
      };
    default:
      return state;
  }
};
