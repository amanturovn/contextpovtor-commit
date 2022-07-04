import React, { useReducer } from "react";
import axios from "axios";
import { useResolvedPath } from "react-router-dom";
import { red } from "@mui/material/colors";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  oneProduct: null,
  pages: 0,
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / 2),
      }; // добавили data для count pages/ колочество страниц

    case "GET_ONE":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}

const PRODUCTS_API = "http://localhost:8000/products";

const ProductsContextProvider = ({ children }) => {
  //! creat
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // console.log(state);
  async function createProduct(newProduct) {
    await axios.post(PRODUCTS_API, newProduct);
    getProducts();
  }

  //! read
  async function getProducts() {
    let res = await axios(`${PRODUCTS_API}${window.location.search}`);
    // console.log(res.headers["x-total-count"] / 2);
    // console.log(Math.ceil(res.headers["x-total-count"] / 2));
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
  }
  //! delete
  async function deleteProduct(id) {
    await axios.delete(`${PRODUCTS_API}/${id}`);
    getProducts();
  }

  //! details, get for edit

  async function getOneProduct(id) {
    const res = await axios(`${PRODUCTS_API}/${id}`);
    // console.log(res);
    dispatch({
      type: "GET_ONE",
      payload: res.data,
    });
  }

  //! UPDATE

  async function updateProduct(id, editedProduct) {
    await axios.patch(`${PRODUCTS_API}/${id}`, editedProduct);
    getProducts();
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        oneProduct: state.oneProduct,
        pages: state.pages,
        createProduct,
        getProducts,
        deleteProduct,
        getOneProduct,
        updateProduct,
      }}>
      {children}
    </productsContext.Provider>
  );
};
export default ProductsContextProvider;
