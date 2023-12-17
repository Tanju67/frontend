import React, { useContext } from "react";
import classes from "./PagesSection.module.css";
import { AuthContext } from "../context/auth-context";
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";
import { IoBagAddSharp } from "react-icons/io5";
import { RiLoginBoxFill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

function PagesSection() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.pages}>
      <h2>Pages</h2>
      <ul>
        <li>
          <FaHome />
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <GiWorld />
          <NavLink to={"/places"}>All Places</NavLink>
        </li>
        {authCtx.isLoggedIn && (
          <li>
            <FaLocationDot />
            <NavLink to={`/user-places/${authCtx.user.userId}`}>
              My Places
            </NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <IoBagAddSharp />
            <NavLink to={"/add-place"}>Add Place</NavLink>
          </li>
        )}

        {!authCtx.isLoggedIn && (
          <li>
            <RiLoginBoxFill />
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        )}

        {!authCtx.isLoggedIn && (
          <li>
            <GiArchiveRegister />
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <CgProfile />
            <NavLink to={`/profile/${authCtx.user.userId}`}>Profile</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default PagesSection;
