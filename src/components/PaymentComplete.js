import React from "react";
import "./PaymentComplete.css";

const PaymentComplete = ({ success }) => {
	return (
		<div className="paymentComplete">
			{success ? (
				<h1 className="paymentMessage">
					Thank you for your purchase.
					<br></br>A confirmation email has been send to your registered email.
				</h1>
			) : (
				<h1 className="paymentMessage">
					Sorry, there is an issue with your order placement. please place order
					again
				</h1>
			)}
		</div>
	);
};

export default PaymentComplete;
