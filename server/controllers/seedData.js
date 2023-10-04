const { User } = require("../models/user");
const { Order } = require("../models/order");
const { OrderDetail } = require("../models/orderDetail");
const { Product } = require("../models/product");
const UserDetail = require("../models/userDetail");

const seedData = async () => {
	try {
		// Insert data into the User table
		await User.create({
			username: "HARRY",
			email: "harry@gmail.com",
			hashedPass: "hashed_password",
		});

		//  Product table
		await Product.bulkCreate([
			{
				productName: "NEW! Fine Leather Fragrance Oil",
				description: "Fine Leather Fragrance Oil has a sultry masculine aroma like hand-tanned leather, softened and worn over time. Notes of aged leather, rich florals, and a touch of citrus are wrapped in a warm base of woodsy amber and earthy moss. ",
				price: 51.99,
				stockQuantity: 5,
				category: "Calming oil",
				imageUrl:"https://www.essentialoil.com/cdn/shop/files/Fragrance-London_Man_1_432x432.jpg?v=1693425213",
				ratings:5,
			},
			
			{
				productName: "Frankenscience Oil ",
				description: "Frankincense essential oil is a proprietary blend of resins from four species of Boswellia trees, Boswellia carterii, Boswellia sacra, Boswellia papyrifera, and Boswellia frereana. Considered the ‘king of oils’, Frankincense has extraordinary health benefits when used topically or taken internally.* According to pre-clinical research, Frankincense essential oil may promote healthy cellular function when taken internally.* Experimental research suggests internal use of Frankincense, high in α-pinene, may provide soothing effects to the body.* Because of the oil’s significant level of α α-pinene, preclinical research also indicates Frankincense may help maintain healthy skin structure.* Nourishing and clarifying as an addition to daily skin care, the oil’s warm, spicy, herbal aroma creates a relaxing yet uplifting atmosphere",
				price: 29.99,
				stockQuantity: 5,
				category: "medicinal Oil",
				imageUrl:"https://doterra-prod-media1.s3.amazonaws.com/h43/h12/27855358623774.png",
				ratings:3,
			},
			
			{
			productName: "Apple Cinnamon Oil",
			description: "Apple Cinnamon Fragrance Oil captures the richness and warmth of this classic sweet and spicy pairing. Fruity top notes of ripe apple and peach are contrasted by sharp cinnamon in the middle and rounded out with a sweet and earthy base of vanilla and dry herbs.",
			price: 39.99,
			stockQuantity: 5,
			category: "Culinary Oil",
			imageUrl:"https://www.essentialoil.com/cdn/shop/files/Fragrance-Apple_Cinnamon_1_1024x1024.jpg?v=1693425377",
			ratings:4,
			},
			
				// {
				// 	productName: "Memory Kit + 360 Diffuser Set",
				// 	description: "Overnight olfactory enrichment using an odorant diffuser improves memory and modifies the uncinate fasciculus in older adults.The 10 ml Memory Kit + 360 Diffuser Set includes: 360 Diffuser Lavender 40/42 Essential Oil,Geranium Rose Essential Oil,Oregon Peppermint Essential Oil,Eucalyptus Essential Oil,Lemon Essential Oil,Sweet Orange Essential Oil,Rosemary Essential Oil",
				// 	price: 139.99,
				// 	stockQuantity: 5,
				// 	category: "Culinary Oil",
				// 	imageUrl:"https://www.essentialoil.com/cdn/shop/files/Untitleddesign_2_1080x1080.png?v=1693924323",
				// 	ratings:4,
				// 	},



		]);

		//  Order table
		await Order.create({
			orderDate: new Date(),
			status: "processing",
			userId: 1,
			total: 99.99
		});

		//  OrderDetail table
		await OrderDetail.create({
			quantity: 2,
			productId: 1,
			orderId: 1,
		});

		await UserDetail.create({
			userId: 1,
			fullName: "Harry Smith",
			address: "123 Highway 1",
			city: "Sacramento",
			state: "CA",
			postalCode: "97006",
		});

		console.log("Data seeded successfully.");
	} catch (error) {
		console.error("Error seeding data:", error);
	}
};

module.exports = seedData;
