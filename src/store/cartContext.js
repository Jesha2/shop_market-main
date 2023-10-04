import React, { createContext, useContext, useReducer } from "react";

// Create a store to keep the contents of the cart so it can be accessed by other children/components
 const CartContext = createContext();

// Inside cartProvider,  info you want to have in your store(context) to share globally. here we want state , dispatch() and we pass the useReducer  as the value to be stored in the context. state will contain the items in the cart(state.cart) and dispatch() will contain logic, what happens when we add/remove  items from cart. also we can use it to do diff things using the info in cart like find order total. here since i am passing useReducer as the value, i am storing an Array in the context[state, dispatch].you can also store objects eg: const [state, dispatch] = useReducer(cartReducer, initialState);<CartProvider.Provider value={{ state, dispatch }}>

 export const CartProvider = ({ cartReducer, initialState, children }) => (
  <CartContext.Provider value={useReducer(cartReducer, initialState)}>
    {children}
  </CartContext.Provider>
);

// Pull information from the cartContext by using this custom hook. you will have access to state and dispatch
export const useCartValue = () => useContext(CartContext);

export default CartContext;