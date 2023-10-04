import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { useCartValue } from "../store/cartContext";
import { getCartTotal } from "../store/cartReducer";
//import AuthContext from "../store/authContext";
import PaymentComplete from "./PaymentComplete";

const CreateOrder = () => {
	const navigate = useNavigate();
	const [success, setSuccess] = useState('false');
	const redirect_status = new URLSearchParams(window.location.search).get(
		"redirect_status"
	);

	let cart = localStorage.getItem("cart");
	if (cart) {
		cart = JSON.parse(cart);
	}
	console.log("*cart ", cart);
	const totalAmt = getCartTotal(cart);
	console.log("totalAmt", totalAmt);
	// const cartItems = cart.map((item) => ({
	// 	price: item.price,
	//   quantity: item.quantity, //quantity for each item
	// })
	// );

	const addOrderToDatabase = async () => {
		//console.log("addOrderToDatabase" + localStorage.getItem("token"));
		try {
			const response = await axios.post(
				"/order",
				{
					items: cart,
					userId: localStorage.getItem("userId"),
					orderTotal: totalAmt,
				},
				{
					headers: {
						authorization: localStorage.getItem("token"),
					},
				}
			);
			console.log("Order saved:", response.data);
		} catch (err) {
			console.error("Error saving order:", err);
		}
	};
	useEffect(() => {
		if (redirect_status === "succeeded") {
			console.log(redirect_status);
			if(cart) addOrderToDatabase();// if the user refreshes the page, we don't want to do an db call
			localStorage.removeItem("cart");
			setSuccess(true)
		}
	}, []);

	//const navigate = useNavigate();

	//alert("cart",cart);

	return (
		<div>
			<PaymentComplete success={success}/>
		</div>
	);
};

export default CreateOrder;
