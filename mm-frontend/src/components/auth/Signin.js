import React, { useState } from "react";
import Base from "../main/Base";
import { Link, Redirect } from "react-router-dom";
import logo from '../../assets/logo.png'
import './helper/styles.css'

import { signin, authenticate, isAuthenticated } from "./helper/helper";
import Header from "../shared/Header/Header";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
          console.log("signin failed")
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
            console.log("signin successful")
          });
        }
      })
      .catch(err => console.log(err));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="loading__message">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="">
        <div className="">
          <div
            className="message__error"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
//   const successMessage = () => { 
//     return(
//     <div className="">
//           <div className="">
//               <div className="message__success" style={{display: success ? "" : "none"}}>
//                   New account was created successfully. Please <Link to="/signin">Login here</Link>
//               </div>
//           </div>
//     </div>
// )};

  const signInForm = () => {
    return (
        <div className="login">
        <Link to="/">
          <img
            className="login__logo"
            src={logo}
          />
        </Link>
  
        <div className="login__container">
          <h1>Login</h1>
  
          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={handleChange("email")}
            />
  
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={handleChange("password")}
            />
  
            <button
              type="submit"
              onClick={onSubmit}
              className="login__signInButton"
            >
              Sign In
            </button>
          </form>
  
          <p>
          By continuing, you agree to Melting Media's Conditions of Use and Privacy Notice.
          </p>
  
          <p style={{"text-align":"center"}}>
          Not a user? <Link to="/signup">Register here</Link>
          </p>
          <Link to="/signup">
            <button className="login__registerButton">
              Create your Account here
            </button>
          </Link>
        </div>
      </div>);
  };

  return (
    <div>
    <Header/>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </div>
  );
};

export default Signin;