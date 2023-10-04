import React, { useState } from "react";
import "./Header.css";
// import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { amber } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartValue } from "../store/cartContext";
import { getCartTotal } from "../store/cartReducer";

import { useContext } from "react";
import AuthContext from "../store/authContext";

//const primary = `rgba(${red[500]}, 0.5)`;
//const transparentColor = "rgba(255, 0, 0, 0.5)";

const Header = () => {
	//console.log("header");
	//const [state, dispatch] = useCartValue();
	const [{ cart }] = useCartValue();

	const { state, dispatch } = useContext(AuthContext);
	//console.log("cart state", cart, state);
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/");
	};
	const navigate = useNavigate();
	const location = useLocation(); // when loggin tp pass the location of which page/path user logged in so that it can go back to that page
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const handleClickHello = () => {
		if (state.token) {
			toggleDropdown();
		}
	};
	return (
		<div className="header ">
			{/* //header divided into 3 parts: logo, search bar,cart-each of these div
			will have another 2 */}
			<Link to="/" className="link-no-underline link-hover">
				<div className="header_logo">
					<WaterDropIcon
						fontSize="large"
						sx={{ color: amber[500] }}
						className="header_logoImage"
					/>
					<h1 className="header_logoTitle">Essential Oils</h1>
				</div>
			</Link>

			<div className="header_search">
				<input
					type="text"
					className="header_searchInput"
					// value="4242424242424242"
				/>
				<SearchIcon className="header_searchIcon link-hover"></SearchIcon>
				{/* <BiSearchAlt2 size="2em" color="#DA7635" /> */}
			</div>
			<div className="header_nav">
				<div className="nav_item ">
					{state.token ? (
						// Content to display when the user is logged in
						<>
							<div className="user-info">
								<span className="nav_itemLine2" onClick={handleClickHello}>
									Hello {state.username}
								</span>
								{isDropdownOpen && (
									<div className="dropdown-menu">
										<ul>
											<li>
												<Link
													to="/profile "
													className="link-no-underline whiteColor " onClick={handleClickHello} 
												>
													Profile
												</Link>
											</li>
											<li>
											
												 <Link
													to={`/orders/${state.userId}`}
													className="link-no-underline whiteColor " onClick={handleClickHello}
												>
												Orders
												</Link> 
											</li>
										</ul>
									</div>
								)}
							</div>
							<span className="nav_itemLine2 link-hover" onClick={handleLogout}>
								Logout
							</span>
						</>
					) : (
						// Content to display when the user is not logged in
						<>
							<div className="user-info">
								<span className="nav_itemLine2 link-hover">Hello Guest</span>

								<Link
									to="/auth"
									className="link-no-underline whiteColor "
									state={{ from: location.pathname }}
								>
									<span className="nav_itemLine2 link-hover">Sign in</span>
								</Link>
							</div>
						</>
					)}
				</div>

				{/* <div className="nav_item">
					<span className="nav_itemLine1">shopy</span>
					<span className="nav_itemLine2">market</span>
				</div> */}
				<Link to="/cart" className=" link-hover link-no-underline">
					<div className="nav_itemCart link-hover">
						<ShoppingCartTwoToneIcon className="link-hover" />
						<span className="nav_itemLine2 nav_cartCount">
							{cart.reduce((total, item) => total + item.quantity, 0)}
						</span>
					</div>
					<div>
						<span className="nav_itemLine2 whiteColor ">
							${getCartTotal(cart)}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
