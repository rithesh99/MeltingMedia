import React from "react";
import "./Header.css";
import Logo from "../../../assets/logo.png";
import { isAuthenticated, signout } from "../../auth/helper/helper";

function Header() {
  
  return (
    <div className="header">
      <div className="header__logo">
        <img src={Logo} alt="" className="header__logo__pic" />
        <h2 className="header__title">Melting Media</h2>
      </div>
      <div className="header__center"></div>
      <div className="header__navs">
      {isAuthenticated() && (
          <a href="/" className="header__link">
            Home
          </a>
        )}
        {isAuthenticated() && (
          <a href="/add" className="header__link">
            Add post
          </a>
        )}
        {isAuthenticated() && (
          <a href="/profile" className="header__link">
            Profile
          </a>
        )}
        {!isAuthenticated() && (
          <a href="/signup" className="header__link">
            Signup
          </a>
        )}
        {!isAuthenticated() && (
          <a href="/signin" className="header__link">
            Signin
          </a>
        )}

        {isAuthenticated() && (
          <a href="/" onClick={() => signout()} className="header__link">
            Signout
          </a>
        )}
      </div>
    </div>
  );
}

export default Header;
