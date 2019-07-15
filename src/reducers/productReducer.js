import luss from '../apis/luss';
export const FETCH_PRODUCTS = 'luss/FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'luss/FETCH_PRODUCT';
export const ADD_CART = 'luss/ADD_CART';
export const EDIT_CART = 'luss/EDIT_CART';

export const fetchProducts = () => async dispatch => {
  const response = await luss.get('/api/luss');

  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = id => async dispatch => {
  const response = await luss.get(`/api/luss/${id}`);

  dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const addCart = data => async dispatch => {
  dispatch({ type: ADD_CART, payload: data });
};

export const editCart = data => async dispatch => {
  dispatch({ type: EDIT_CART, payload: data });
};

const initialState = {
  productDb: null,
  product: null,
  carts: [],
  cart: null,
  error: '',
  loading: false
};

const pushToArrayCart = (state, payload) => {
  let res = state.carts;
  if (!res) res = [];
  let inCart = res.find(
    cart => cart.detail.id === payload.detail.id && cart.size === payload.size
  );
  if (inCart) inCart.quantity = inCart.quantity + payload.quantity;
  else res.push(payload);

  return res;
};

const editToArrayCart = (state, payload) => {
  let res = state.carts;
  let inCart = res.find(cart => cart.id === payload.id);
  if (inCart) {
    inCart.quantity = payload.quantity;
    inCart.size = payload.size;
    inCart.complete = payload.complete;
  }

  return res;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        productDb: action.payload
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload[0]
      };
    case ADD_CART:
      return {
        ...state,
        carts: pushToArrayCart(state, action.payload),
        cart: action.payload
      };
    case EDIT_CART:
      return {
        ...state,
        carts: editToArrayCart(state, action.payload),
        cart: action.payload
      };
    default:
      return state;
  }
};
