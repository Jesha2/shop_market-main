import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
//import ProductDisplay from "./ProductDisplay";
import Product from "./Product";

const Home = () => {
	const [loading, setLoading] = useState(false);
	//console.log("********HOME");
	//const apiUrl = 'http://localhost:4000/products'
	const [products, setProducts] = useState([]);
	useEffect(() => {
	//console.log("USEEFFECT in HOMEJS");
		axios
			//.get("http://54.84.211.174:4000")
			.get("/products")
			.then((res) => {
				setProducts(res.data);
				console.log(res.data);
			})

			.catch((err) => {
				console.log(err);
			});
	}, []);
	//console.log(products);
	return (
		// image Display
		<div className="home">
			<div className="image-container">
				<div className="image-center">
					<br /> <br />
					Welcome to world of essential oils
				</div>
			</div>
 
			{/*PRODUCT DISPLAY */}
			<div className="home_product">
			{loading ? (
        <div>Loading...</div>
      ) : (
				products.map((product, index) => (
					<Product key={index} product={product} />
				))
				)}
			</div>
		</div>
	);
};

export default Home;



// {/* <ProductDisplay products={products} /> */}
