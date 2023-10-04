const { User } = require("../models/user");
const { Order } = require("../models/order");
const { OrderDetail } = require("../models/orderDetail");
const { Product } = require("../models/product");

module.exports = {
	
	getAllProducts: async (req, res) => {
		try {
			console.log("========================getAllProduct");
			const Products = await Product.findAll();
			console.log("===================success in getAllProducts");

			res.status(200).send(Products);
		} catch (error) {
			console.log("ERROR IN getAllProduct");
			console.log(error);
			res.sendStatus(400);
		}
	},
	
	addOrder: async (req, res) => {
		console.log("addOrder");
		try {
			const { userId, items, orderTotal } = req.body;
			//console.log(userId, items)
			// add to order table so that an orderid is created for the userid
			await Order.create({
				orderDate: new Date(),
				status: "processing", 
				userId: userId,
				total:orderTotal,
			});
			// retrieve the new orderid for the userId
			const newOrder = await Order.findOne({
				where: { userId: userId },
				attributes: ['id'],
				order: [['id', 'DESC']], // Order by id in descending order to get the latest order for the userID
			  });
			  const newOrderId = newOrder.id;
			console.log("newOrder.id ",newOrderId);
			console.log(items)
			// Loop through the orderDetail array and create OrderDetail records for each product
			for (const product of items) {
				await OrderDetail.create({
					quantity: product.quantity,
					productId: product.id,
					orderId: newOrderId, // Set the OrderId to the newly created Order's id
				});
			}
			console.log("newOrder.id",newOrderId);
			console.log("Order added successfully");

			res.status(200).send({ orderId: newOrderId });
			//res.status(200).json({ order_id: newOrder.id }); // Send back the order ID as JSON
		} catch (err) {
			res.sendStatus(400).send("Error adding add Order/orderDetails " + err);
			console.error(err);
		}
	},

	


	getFavProducts: async (req, res) => {
		//console.log("========================getFavProducts");

	// 	try {
			
	// 		const products = await Order.findAll({
	// 			where: { rating>3 },
				
	// 		});
	// 		res.status(200).send(products);
	// 	} catch (error) {
	// 		console.log("ERROR IN getFavProducts");
	// 		console.log(error);
	// 		res.sendStatus(400);
	// 	}
	 },

	getOrders: async (req, res) => {
		try {
			const { userId } = req.params;
			const orders = await Order.findAll({
				where: { userId: userId },
				attributes: ["id", "orderDate", "status","total"], // the attributes to retrieve
				order: [["orderDate", "DESC"]]
			});
			console.log(" getOrder() success");
			res.status(200).send(orders);
		} catch (error) {
			console.log("ERROR IN getOrder");
			console.log(error);
			res.sendStatus(400);
		}
	},

	getOrderDetails: async (req, res) => {
		try {
		  const { orderId } = req.params;
		  const orderDetails = await OrderDetail.findAll({
			where: { orderId: orderId },
			include: [
			  {
				model: Order,
				required: true, // inner join
				attributes: [`orderDate`, `status`,`total`],
			  },
			  {
				model: Product, // Include the Product model
				attributes: ["productName", "imageUrl", "price"], //  the attributes to include
			  },
			],
		  });
	  
		  console.log(orderDetails);
		  res.status(200).send(orderDetails);
		} catch (error) {
		  console.log("ERROR IN getOrder");
		  console.log(error);
		  res.sendStatus(400);
		}
	  },
	  
};




//addOrder: async ({ userId, items, orderTotal }) => {
	// 		console.log("addOrder");
	// 		try {
	// 			//const { userId, items, orderTotal } = req.body;
	// console.log(userId,items, orderTotal)
	// // add to order table so that an orderid is created for the userid
	// 			await Order.create({
	// 				orderDate: new Date(),
	// 				status: "processing", 
	// 				userId: userId,
	// 				total:+orderTotal,
	// 			});
	// 			// retrieve the new orderid for the userId
	// 			const newOrder = await Order.findOne({
	// 				where: { userId: userId },
	// 				attributes: ['id'],
	// 				order: [['id', 'DESC']], // Order by id in descending order to get the latest order for the userID
	// 			  });
	// 			console.log("newOrder.id",newOrder.id);
	// 			console.log(items)
	// 			// Loop through the orderDetail array and create OrderDetail records for each product
	// 			for (const product of items) {
	// 				await OrderDetail.create({
	// 					quantity: product.quantity,
	// 					productId: product.id,
	// 					orderId: newOrder.id, // Set the OrderId to the newly created Order's id
	// 				});
	// 			}
	// 			console.log("newOrder.id",newOrder.id);
	// 			//res.status(200).json({ order_id: newOrder.id }); // Send back the order ID as JSON
	// 			console.log("Order added successfully");
	// 			return newOrder.id; // Return the order ID
	// 		  } catch (err) {
	// 			console.error("Error adding add Order/orderDetails " + err);
	// 			throw err; // Rethrow the error so it can be caught and handled in the calling code
	// 		  }
	// 		},
