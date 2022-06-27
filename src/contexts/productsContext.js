import React, { useReducer } from "react";
import axios from "axios";
import { useResolvedPath } from "react-router-dom";
import { red } from "@mui/material/colors";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  oneProduct: null,
};
function reduser(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}

const PRODUCTS_API = "http://localhost:8000/products";

const ProductsContextProvider = ({ children }) => {
  //! creat
  const [state, dispatch] = useReducer(reduser, INIT_STATE);

  async function createProduct(newProduct) {
    await axios.post(PRODUCTS_API, newProduct);
    getProducts();
  }

  //! read
  async function getProducts() {
    let res = await axios(PRODUCTS_API);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res.data,
    });
  }

  async function deleteProduct(id) {
    await axios.delete(`${PRODUCTS_API}/${id}`);
    getProducts();
  }

  //! details

  async function getOneProduct(id) {
    const res = await axios(`${PRODUCTS_API}/${id}`);
    // console.log(res);
    dispatch({
      type: "GET_ONE",
      payload: res.data,
    });
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        oneProduct: state.oneProduct,
        createProduct,
        getProducts,
        deleteProduct,
        getOneProduct,
      }}>
      {children}
    </productsContext.Provider>
  );
};
export default ProductsContextProvider;
