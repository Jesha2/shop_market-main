// seedController.js
const { sequelize } = require("../util/database");
const seedData = require("./seedData");

const { User } = require("../models/user");
const { Order } = require("../models/order");
const { OrderDetail } = require("../models/orderDetail");
const { Product } = require("../models/product");
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);
Product.hasMany(OrderDetail);
OrderDetail.belongsTo(Product);

module.exports = {
	seed: async (req, res) => {
		console.log("Seed route called");
		try {
			await sequelize.sync({ force: true }); // CONNECTS TO DB AND CREATES ALL TABLES 
			await seedData(); // Seed the data
      		if(res) res.status(200).send("message: Data seeding complete.");
			//res.status(200).json({ message: "Data seeding complete." });
		} catch (error) {
			console.error("Error seeding data:", error);
      		if (res) res.status(500).send(" error: Internal server error" );
			//res.status(500).json({ error: "Internal server error" });
		}
	},
};
