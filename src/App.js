import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/authContext";
//import { useCartValue } from "./store/cartContext";
//import { getCartTotal } from "./store/cartReducer";
import Header from "./components/Header";
//import Login from "./components/Login";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import Product from "./components/Product";
import PaymentComplete from "./components/PaymentComplete"
import Footer from "./components/Footer";
import CreateOrder from"./components/CreateOrder";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { CartProvider } from "./store/cartContext";
import Auth from "./components/Auth";

function App() {
	const { state } = useContext(AuthContext);
	
	return (
		<div className="App">
			<BrowserRouter>
				<main>
					<Header />
					<Routes>
						<Route path="/auth" element={<Auth />} />
						<Route path='/checkout' element={state.token ? <Checkout/> : <Auth />} />
						{/* <Route path='/checkout' element={state.token ? <Checkout/> : <Navigate to="/auth" />}/>  */}
						<Route path="/cart" element={<Cart />} />
						<Route path="/orders/:userId" element={<Orders />} />
						<Route path="/profile" />
						<Route path="/paymentComplete" element={<PaymentComplete />} />
						<Route path="/createOrder" element={<CreateOrder />} />
						<Route path="/products" element={<Product />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;


	// {/* <Route
	// 						path="/login"
	// 						element={
	// 							<>
	// 								<Header />
	// 								<Login />
	// 							</>
	// 						}
	// 					/> */}

