import { useState,useContext } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authContext";
import "./Auth.css";
// import { useCartValue } from "../store/cartContext";

const Auth = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [register, setRegister] = useState(true);//usedtocheck if user is registering or logging in
	const { dispatch } = useContext(AuthContext);
	//const [state, dispatch] = useCartValue();  
	const navigate = useNavigate();
	const location = useLocation();

	const submitHandler = (e) => {
		e.preventDefault();
		let body = { username, password , email};
		axios
			.post(register ? "/register" : "/login", body)
			.then((res) => {
				dispatch({ type: "LOGIN", payload: res.data });
				navigate(location.state?.from || "/");
			})
			.catch((err) => {
				if (err.response.data) {
					alert(err.response.data);
				}
				console.error(err);
			});
		console.log("submitHandler called");

	};

	return (
		<main className ="auth_main" >
			<h1>Welcome!</h1>
			<form className="form auth-form" onSubmit={submitHandler}>
				<input
					className="form-input"
					placeholder="Username"
					type = "text"
					name="username"
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					className="form-input"
					placeholder="Password"
					type = "password"
					name="password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				{register &&
				(<input
					className="form-input"
					placeholder="email"
					type = "email"
					name="email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>)
				}
				<button className="form-btn">{register ? "Sign Up" : "Login"}</button>
			</form>
			<button className="form-btn link-no-underline whiteColor"  
			onClick={() => setRegister(!register)}>
				Need to {register ? "Login" : "Sign Up"}?
			</button>
		</main>
	);
};

export default Auth;

