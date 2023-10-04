import React, { useEffect, useState, useContext } from "react";
//import axios from "axios";
import AuthContext from "../store/authContext";
import { useCartValue } from "../store/cartContext";
import { getCartTotal } from "../store/cartReducer";
import "./CheckoutForm.css";
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
	const return_url = "http://localhost:3000/createOrder";
	//const return_url = "https://shopnmarket.netlify.app/createOrder";
	//const { state } = useContext(AuthContext);
	const [{ cart }] = useCartValue();
	console.log(cart);
	const totalAmt = getCartTotal(cart);

	const stripe = useStripe();
	const elements = useElements();

	//const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	 useEffect(() => {
	 	if (!stripe) {
			return;
		}
		 const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);
		console.log("clientSecret " + clientSecret);
		if (!clientSecret) {
			return;
		}
		//alert("success21");

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					//alert("success1")
					console.log("Payment succeeded!");
					//addOrderToDatabase();//doesnt work here
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		console.log("inside HandleSubmit");
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		setIsLoading(true);
		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: return_url,
			},
			
		});
		//alert("success11")//doesnt fire

		if (result.error) {
			if (
				result.error.type === "card_error" ||
				result.error.type === "validation_error"
			) {
				setMessage(result.error.message);
			} else {
				setMessage("An unexpected error occurred.");
			}
		} else {
			// The payment has been processed!
			if (result.paymentIntent.status === "succeeded") {
				console.log("Success!");
				
			}
		}
		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<div className="form_container">
			<h3>Please complete your payment information</h3>
			<form id="payment-form" onSubmit={handleSubmit}>
				<LinkAuthenticationElement id="link-authentication-element" />
				
				<PaymentElement id="payment-element" options={paymentElementOptions} />

				<button
					className="button-chkout"
					disabled={isLoading || !stripe || !elements}
					id="submit"
				>
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner"></div>
						) : (
							<h2>Pay ${totalAmt}</h2>
						)}
					</span>
				</button>
				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
}
