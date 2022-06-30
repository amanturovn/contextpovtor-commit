import React from "react";

export const cartContext = React.createContext();

const INIT_STATE = {
  cart: null,
};

function reduser(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}
const CartContextProvider = ({ children }) => {
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: product,
      const: 1,
      subPrice: product.price,
    };
    // console.log(newProduct);
    cart.products.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }
  return (
    <cartContext.Provider value={{ addToCart }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
