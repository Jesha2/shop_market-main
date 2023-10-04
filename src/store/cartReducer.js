export const initialState = {
    cart: [],
};

export const getCartTotal = (cart) => {
  if (cart) {
    const total = cart.reduce((amount, item) => (item.price * item.quantity) + amount, 0);
    return total.toFixed(2); // Rounds the total to 2 decimal places
  } else {
    return "0.00"; // Return a default value or handle the case when cart is not available
  }
}
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      localStorage.setItem("cart", JSON.stringify([...state.cart, action.item]));
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
        
      );

      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product(id: ${action.id}) as it's not in the cart!`
        );
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      //localStorage.setItem("cart", Json.stringfy());
      return {
        ...state,
        cart: newCart,
      };

    case "UPDATE_CART":
      localStorage.setItem("cart", JSON.stringify(action.cart));
      
      return {
        ...state,
        cart: action.cart,
      };

    default:
      return state;
  }
};

export default cartReducer;

