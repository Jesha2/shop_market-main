import React from "react";
import "./CartCard.css";
import { useCartValue } from "../store/cartContext";

const CartCard = ({ product }) => {
	console.log("Product prop in cartCard:", product);
	console.log("**PRODUCTID  ", product.id);
	const [state, dispatch] = useCartValue();

	const removeFromCart = () => {
		dispatch({
			type: "REMOVE_FROM_CART",
			id: product.id,
		});
	};
	return (
		<div className="cartCard">
			<img src={product.imageUrl} alt="" className="cartCard_image" />
			<div className="cartCard_info">
				<p className="cartCard_title">{product.productName}</p>
				<p className="cartCard_price">
					<small>$</small>
					<strong>{product.price}</strong>
				</p>

				<p className="price">Quantity: {product.quantity}</p>
				<div className="cartCard_rating">
					{Array(product.ratings)
						.fill()
						.map((i,index) => (
							<p key={index} >⭐</p>
						))}
				</div>
				<button onClick={removeFromCart}>Remove from Cart</button>
			</div>
		</div>
	);
};

export default CartCard;
