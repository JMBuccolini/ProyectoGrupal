import axios from 'axios'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY';
export const ORDENADO = 'ORDENADO';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';

// import categorias from '../../components/Json/Categorias'

export function getAllProducts() {
  return async (dispatch) => {
    return axios("http://localhost:5050/publication")
     .then(res => dispatch({type:GET_ALL_PRODUCTS, payload: res.data.data.publications.docs}),
    )
  }
}

export function BuscarProducto(title){
  return function (dispatch){
    return dispatch({
      type: GET_PRODUCT,
      payload: title
    })
  }
}

export function getProductByCategory(payload) {
  return {
      type: GET_PRODUCTS_BY_CATEGORY,
      payload
  };
}
export function GetProductById(_id){
  console.log(_id);
  return{
    type: GET_PRODUCT_BY_ID,
    payload: _id,
  }
}
// export function getAllCategory(payload) {
//   return (dispatch) => {
//     dispatch({
//       type: GET_CATEGORIES,
//       payload: [...categorias]
//     })
//   }
// }

export function ordenado(payload) {
  return (dispatch) => {
    dispatch({
      type: ORDENADO,
      payload,
    });
  };
}
