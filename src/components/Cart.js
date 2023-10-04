import React, { useEffect, useContext } from "react";
//import axios from "axios";
import "./Cart.css";
import { useCartValue } from "../store/cartContext";
import { getCartTotal } from "../store/cartReducer";
import CartCard from "./CartCard";
import { Link, useLocation } from "react-router-dom";
//import AuthContext from "../store/authContext";

const Cart = () => {
	const [{ cart }] = useCartValue();
	const value = getCartTotal(cart);
	//const { state } = useContext(AuthContext);
	//const products = cart;
	console.log("cart", cart);
	// const cartItems = cart.map((item) => ({
	// 	price: item.price,
	// 	quantity: item.quantity, //quantity for each item
	// }));
	//   const checkoutButtonHandler=(e)=>{
	// 		e.preventDefault();
	// 		let body = { cartItems, userId: state.userId};
	// 		axios
	// 			.post("/create-checkout-session", body)
	// 			.then((res) => {
	// 			})
	// 			.catch((err) => {
	// 				if (err.response.data) {
	// 					alert(err.response.data);
	// 				}
	// 				console.error(err);
	// 			});
	// 	};

	const location = useLocation();
	return (
		<div className="cart">
			<div className="cart_left">
				<h2 className="cart_title">Your Shopping cart</h2>
				<div>
					{cart.map((product, index) => (
						<CartCard key={index} product={product} />
					))}
				</div>
			</div>

			<div className="cart_right">
				<div className="subtotal">
					<p>
						Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)}{" "}
						items): <strong>${value}</strong>
					</p>

					<Link
						to="/checkout"
						className="link-no-underline whiteColor"
						state={{ from: location.pathname }}
					>
						{/* <button onClick={checkoutButtonHandler}>Checkout</button> */}
						<button>Proceed to Checkout</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
