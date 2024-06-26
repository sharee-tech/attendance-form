import { useAuth } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";
import React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import AccountIcon from "@mui/icons-material/AccountBox";

const NavMenu = () => {
  const { auth, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showOnMobile, setShowOnMobile] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const changeView = () => {
  //   setShowOnMobile(!showOnMobile);
  // };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 768) {
      setShowMenu(false);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="nav-menu">
      <div className="container">
        <div className="nav-menu-left">
          <div className="nav-item">
            <NavLink to="/" className="nav-logo">
              Home
            </NavLink>
          </div>
        </div>
        <div className="nav-menu-right">
          <div
            className={`icon-open ${showMenu ? "hide-mobile" : ""}`}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </div>
          <span
            className={`icon-close ${showMenu ? "" : "hide-mobile"}`}
            onClick={toggleMenu}
          >
            <CloseIcon />
          </span>
          <div className={`nav-list ${showMenu ? "" : "show-menu"}`}>
            {auth && (
              <div className="nav-item">
                <NavLink
                  to="/absences"
                  className="nav-link"
                  onClick={closeMenuOnMobile}
                >
                  Absences
                </NavLink>
              </div>
            )}
            {auth && (
              <div className="nav-item">
                <NavLink
                  to="roster"
                  className="nav-link"
                  onClick={closeMenuOnMobile}
                >
                  Roster
                </NavLink>
              </div>
            )}
            {auth && (
              <div className={`nav-item ${showOnMobile ? "" : "show-mobile"}`}>
                <NavLink
                  to="/admin"
                  className="nav-link"
                  // className={`nav-link ${showOnMobile ? "" : "show-mobile"}`}
                  onClick={closeMenuOnMobile}
                >
                  Account
                </NavLink>
              </div>
            )}
            {auth && (
              <div className={`nav-item ${showOnMobile ? "" : "show-mobile"}`}>
                <NavLink
                  to="/login"
                  className="nav-link"
                  // className={`nav-link ${showOnMobile ? "" : "show-mobile"}`}
                  onClick={closeMenuOnMobile}
                >
                  Logout
                </NavLink>
              </div>
            )}
            {auth && (
              <div className="nav-item dropdown">
                <span
                  className={`dropbtn ${showOnMobile ? "" : "hide-mobile"}`}
                >
                  <IconButton>
                    <AccountIcon />
                  </IconButton>
                </span>
                <div className="dropdown-content">
                  <a href="/admin">Account</a>
                  <a href="#" onClick={handleLogout}>
                    LogOut
                  </a>
                </div>
              </div>
            )}

            {!auth && (
              <div className="nav-item">
                <NavLink
                  to="/login"
                  className={`nav-link ${showOnMobile ? "" : "show-mobile"}`}
                  onClick={closeMenuOnMobile}
                >
                  Login
                </NavLink>
              </div>
            )}

            {!auth && (
              <div
                className={`nav-item dropdown ${
                  showOnMobile ? "" : "hide-mobile"
                }`}
              >
                <span className="dropbtn">
                  <AccountIcon />
                </span>
                <div className="dropdown-content">
                  {/* <a href="/signup">Register</a> */}
                  <a href="/login">Login</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
