import luss from '../apis/luss';
export const FETCH_PRODUCTS = 'luss/FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'luss/FETCH_PRODUCT';
export const FETCH_CART = 'luss/FETCH_CART';
export const ADD_CART = 'luss/ADD_CART';
export const ADD_CART_SUCCESS = 'luss/ADD_CART_SUCCESS';
export const EDIT_CART = 'luss/EDIT_CART';
export const EDIT_CART_SUCCESS = 'luss/EDIT_CART_SUCCESS';
export const DELETE_CART = 'luss/DELETE_CART';

export const fetchProducts = () => async dispatch => {
  const response = await luss.get('/api/luss');

  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = id => async dispatch => {
  const response = await luss.get(`/api/luss/${id}`);

  dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const fetchCarts = accessToken => async dispatch => {
  const user = await luss.get(`/api/luss/user/${accessToken}`);
  let result = [];

  if (user.data[0]) {
    const response = await luss.get(`/api/luss/carts/${user.data[0].id}`);

    result = await response.data.map(async value => {
      value.complete = value.complete ? true : false;
      const res = await luss.get(`/api/luss/${value.detail_id}`);
      value.detail = res.data[0];
      return await value;
    });
  }

  Promise.all(result).then(results => {
    return dispatch({ type: FETCH_CART, payload: results });
  });
};

export const addCart = (data, auth, carts) => async dispatch => {
  data.detail_id = data.detail.id;
  data.user_id = auth.user.id;
  data.complete = data.complete ? 1 : 0;

  let res = carts;
  let id = null;
  if (!res) res = [];
  let inCart = res.find(cart => {
    if (cart.detail.id === data.detail.id && cart.size === data.size)
      id = cart.id;
    return cart.detail.id === data.detail.id && cart.size === data.size;
  });
  if (inCart) {
    inCart.quantity = inCart.quantity + data.quantity;
    luss.put(`/api/luss/carts/edit`, {
      id,
      quantity: inCart.quantity
    });
  } else {
    luss.post(`/api/luss/carts/create`, data);
    res.push(data);
  }

  dispatch({ type: ADD_CART, payload: null });
  dispatch({ type: ADD_CART_SUCCESS, payload: res });
};

export const editCart = (data, carts) => async dispatch => {
  let res = carts;
  let id = null;
  if (!res) res = [];
  let inCart = res.find(cart => {
    if (cart.id === data.id) id = cart.id;
    return cart.id === data.id;
  });
  if (inCart) {
    inCart.quantity = data.quantity;
    inCart.size = data.size;
    inCart.complete = data.complete;
    luss.put(`/api/luss/carts/edit`, {
      id,
      size: inCart.size,
      quantity: inCart.quantity,
      complete: inCart.complete ? 1 : 0
    });
  }

  dispatch({ type: EDIT_CART, payload: null });
  dispatch({ type: EDIT_CART_SUCCESS, payload: res });
};

export const deleteCart = id => async dispatch => {
  luss.delete(`/api/luss/carts/delete/${id}`);

  dispatch({ type: DELETE_CART, payload: id });
};

const initialState = {
  productDb: null,
  product: null,
  carts: [],
  cart: null,
  error: '',
  loading: false
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
    case FETCH_CART:
      return {
        ...state,
        carts: action.payload,
        cart: null
      };
    case ADD_CART:
      return {
        ...state,
        cart: null
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        carts: action.payload,
        cart: action.payload[0]
      };
    case EDIT_CART:
      return {
        ...state,
        carts: null,
        cart: null
      };
    case EDIT_CART_SUCCESS:
      return {
        ...state,
        carts: action.payload,
        cart: action.payload[0]
      };
    case DELETE_CART:
      return {
        ...state,
        carts: state.carts.filter(cart => cart.id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
};
