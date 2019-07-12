import luss from '../apis/luss';
export const FETCH_PRODUCTS = 'luss/FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'luss/FETCH_PRODUCT';

export const fetchProducts = () => async dispatch => {
  const response = await luss.get('/api/luss');

  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = id => async dispatch => {
  const response = await luss.get(`/api/luss/${id}`);

  dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

const initialState = {
  productDb: null,
  product: null,
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
    default:
      return state;
  }
};
