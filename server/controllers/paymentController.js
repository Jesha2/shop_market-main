const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Product } = require("../models/product");
const { addOrder } = require("./productController");

const calculateOrderTotal = async (items) => {
	try {
		const itemIds = items.map((item) => item.id);

		// Batch fetch products using a single database query
		const products = await Product.findAll({
			where: {
				id: itemIds,
			},
		});

		let totalAmount = 0;

		for (const item of items) {
			// Find the corresponding product in the fetched products
			const product = products.find((p) => p.id === item.id);

			if (product) {
				// Calculate the item's total price based on its price and quantity
				const itemTotal = product.price * item.quantity; // Assuming product.price is in dollars

				totalAmount += itemTotal;
			}
		}

		console.log("totalAmount   " + totalAmount);
		return totalAmount;
		//return Math.round(totalAmount * 100); // Convert to cents and round to an integer
	} catch (error) {
		console.error("Error calculating order amount:", error);
		throw error;
	}
};
// module.exports = {
// 	createPaymentIntent: async (req, res) => {
// 		console.log("createPaymentIntent");
// 		const { userId, items, email } = req.body; //has ids and quantity
// 		let orderTotal = 0;
// 		console.log(items);
// 		try {
// 			if (items.length > 0) {
// 				orderTotal = await calculateOrderTotal(items);

// 				const paymentIntent = await stripe.paymentIntents.create({
// 					amount: Math.round(orderTotal * 100),
// 					currency: "usd",
// 					// Verify your integration in this guide by including this parameter
// 					metadata: { integration_check: "accept_a_payment" },
// 					receipt_email: email,
// 				});

// 				res.json({ client_secret: paymentIntent["client_secret"] });
// 			} else {
// 				res.status(400).json({ error: "No items in the order" });
// 			}
// 		} catch (error) {
// 			console.error("Error creating payment intent:", error);
// 			res.status(500).json({ error: "Error creating payment intent" });
// 		}
// 	},

	module.exports = {
		createPaymentIntent: async (req, res) => {
			console.log("createPaymentIntent");
			const { userId, items } = req.body; //has ids and quantity
			let orderTotal = 0;
			console.log(items);
			try {
				if (items.length > 0) {
					orderTotal = await calculateOrderTotal(items);

					// Create a PaymentIntent with the order amount and currency
					const paymentIntent = await stripe.paymentIntents.create({
						amount: Math.round(orderTotal * 100),
						currency: "usd",
						// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
						automatic_payment_methods: {
							enabled: true,
						},
					});
					res.send({
						clientSecret: paymentIntent.client_secret,
					});
				} else {
					res.status(400).json({ error: "No items in the order" });
				}
			} catch (error) {
				console.error("Error creating payment intent:", error);
				res.status(500).json({ error: "Error creating payment intent" });
			}
		},

	getStripeApiKey: async (req, res) => {},
};

//   try {
//     // After payment is successful, save the cart items to order and order details table.
//    const newOrderId =  await addOrder({

//         userId,
//         items,
//         orderTotal,

//     });
//     console.log("newOrderId "+newOrderId)
// }catch(E)
