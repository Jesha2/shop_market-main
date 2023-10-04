
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path")
const PORT = process.env.SERVER_PORT || 4000;
//let endpointSecret = process.env.END_POINT_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //used backend
//const stripe= require("stripe")(process.env.STRIPE_API); //used in front end
//const YOUR_DOMAIN = "http://localhost:3000/paymentComplete";

const { seed } = require("./controllers/seedController");
const { register, login } = require("./controllers/authController");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
	getAllProducts,
	addOrder,
	getOrders,
	getOrderDetails,
} = require("./controllers/productController");

const { createPaymentIntent,getStripeApiKey } = require("./controllers/paymentController");

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'../build')));//Netlify

// the seed controller Rou
app.post("/seed", seed);

//user login/register/authentication routes
app.post("/register", register);
app.post("/login", login); //Using GET for login is generally not recommended because it would involve sending sensitive data (i.e., the username and password) as query parameters in the URL.This approach would expose the sensitive data in the URL, which can be logged in server logs, browser history, or intermediary proxy logs, making it less secure.

//Routes for Products
app.get("/products", getAllProducts);

//Routes for adding,fetching orders
app.post("/order", isAuthenticated,  addOrder);
app.get("/orders/:userId", getOrders);
app.get("/orderDetails/:orderId", getOrderDetails);

 //Payment-Stripe 
app.post("/createPaymentIntent", createPaymentIntent);
//app.post("/payment/process", createPaymentIntent);
app.get("/payment/process", getStripeApiKey);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//seed();

//cc# for stripe testing : 4000002500003155


//Payment-Stripe
// app.post('/create-checkout-session', async (req, res) => {
// console.log("Inside stripe's create-checkout-session");
 
//     const { cartItems } = req.body;
//     //console.log("cartItems", cartItems)
//   const lineItems = cartItems.map((cartItem) => ({
//     price: cartItem.price, 
//     quantity: cartItem.quantity,
//   }));
//   console.log("lineItems", lineItems)
//   const session = await stripe.checkout.sessions.create({
//     line_items: lineItems,
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });
// Use body-parser to retrieve the raw body as a buffer
// const bodyParser = require('body-parser');

// app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
//   const payload = request.body;
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//   } catch (err) {
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   console.log(" event: " , event);
//   response.status(200).end();
// });

  


// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
// 	const sig = request.headers['stripe-signature'];
  
// 	let event;
  
// 	try {
// 	  event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
// 	} catch (err) {
// 	  response.status(400).send(`Webhook Error: ${err.message}`);
// 	  return;
// 	}
  
// 	// Handle the event
// 	switch (event.type) {
// 	  case 'payment_intent.succeeded':
// 		const paymentIntentSucceeded = event.data.object;
// 		console.log(paymentIntentSucceeded);
// 		// Then define and call a function to handle the event payment_intent.succeeded
// 		break;
// 	  // ... handle other event types
// 	  default:
// 		console.log(`Unhandled event type ${event.type}`);
// 	}
  
// 	// Return a 200 response to acknowledge receipt of the event
// 	response.send();
//   });




// the force: true is for development -- it DROPS tables!!!
// sequelize.sync({ force: true })
//sequelize.sync()//.sync connects to DB &creates tables based on the models & define relations
// sequelize
// 	.sync()
// 	.then(() => {
// 		console.log("Database sync successful.");
// 		//seed();
// 		// Start the Express app
// 		app.listen(PORT, () =>
// 			console.log(`db sync successful & server running on port ${PORT}`)
// 		);
// 	})
// 	.catch((err) => console.log(err));


// OR Comment the above line which starts the express app  and uncomment below lines if you want this file to seed the data or else use the seed API on postman to seed. The following will seed the data each time you start the server
// const startApp = async () => {
//     try {
//       await seed(); // Seed the data
//        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//     } catch (error) {
//       console.error("Error seeding data or starting the server:", error);
//     }
//   };

// //   // Call the startApp function to start the app after seeding
//   startApp();

//const bodyParser = require('body-parser')
//   app.use(bodyParser.json())

// app.use(cors())

// app.post('/pay', async (req, res) => {
//     const {email} = req.body;
    
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 5000,
//         currency: 'usd',
//         // Verify your integration in this guide by including this parameter
//         metadata: {integration_check: 'accept_a_payment'},
//         receipt_email: email,
//       });
// console.log("paymentIntent  :",paymentIntent);
//       res.json({'client_secret': paymentIntent['client_secret']})
// })
