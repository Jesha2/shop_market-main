import React from "react";
import "./Product.css";
import { useCartValue } from "../store/cartContext";

const Product = ({ product }) => {
  const [state, dispatch] = useCartValue();
  const { cart } = state;

  const getItemIndexInCart = () => {
    return cart.findIndex((item) => item.id === product.id);
  };

  const addToCart = () => {
	const existingItemIndex = state.cart.findIndex((item) => item.id === product.id);
  
	if (existingItemIndex !== -1) {
	  // If the item is already in the cart, check if adding 1 would exceed stock
	  const updatedCart = [...state.cart];
	  const itemInCart = updatedCart[existingItemIndex];
  
	  if (itemInCart.quantity < product.stockQuantity) {
		itemInCart.quantity++; // Increment the quantity
		dispatch({
		  type: "UPDATE_CART",
		  cart: updatedCart,
		});
	  } else {
		console.warn(`Cannot add more of product (id: ${product.id}) to the cart. Stock limit reached.`);
	  }
	} else {
	  // If the item is not in the cart, check if stock is available
	  if (product.stockQuantity > 0) {
		dispatch({
		  type: "ADD_TO_CART",
		  item: {
			id: product.id,
			imageUrl: product.imageUrl,
			productName: product.productName,
			price: product.price,
			ratings: product.ratings,
			quantity: 1,
		  },
		});
	  } else {
		console.warn(`Cannot add product (id: ${product.id}) to the cart. Out of stock.`);
	  }
	}
  };
  

  const removeFromCart = () => {
    const itemIndex = getItemIndexInCart();

    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[itemIndex].quantity > 1) {
        // If quantity is greater than 1, decrement it
        updatedCart[itemIndex].quantity--;
      } else {
        // If quantity is 1, remove the item from the cart
        updatedCart.splice(itemIndex, 1);
      }
      dispatch({
        type: "UPDATE_CART",
        cart: updatedCart,
      });
    }
  };

  return (
    <div className="product">
      <img src={product.imageUrl} alt="product_pic" />
      {product.productName}
      <p className="product_price">
        <small>$</small>
        <strong> {product.price}</strong>
      </p>
      <div className="product_rating">
        {Array(product.ratings)
          .fill()
          .map((_, i) => (
            <p key={i}>⭐</p>
          ))}
      </div>
      <div className="cart_controls">
	  {getItemIndexInCart() !== -1 ? (
  <>
        <button className="cart_button" onClick={removeFromCart}>
          -
        </button>
        <span className="cart_quantity">
          {getItemIndexInCart() !== -1 ? cart[getItemIndexInCart()].quantity : 0}
        </span>
        <button className="cart_button" onClick={addToCart}>
          +
        </button>
		</>
) : (
  <button className="cart_button" onClick={addToCart}>
	+ Add
  </button>
)}
      </div>
    </div>
  );
};

export default Product;

