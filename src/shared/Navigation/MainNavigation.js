import React, { useState } from "react";
import classes from "./MainNavigation.module.css";
import NavLinks from "./NavLinks";
import { AiOutlineMenu } from "react-icons/ai";
import BackDrop from "../UiElements/Backdrop";
import SideDrawer from "./SideDrawer";
import logo from "../../assets/oie_transparent (1).png";
import { Link } from "react-router-dom";

function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <div className={classes.mainNavigation}>
      {drawerIsOpen && (
        <BackDrop
          onClick={() => {
            setDrawerIsOpen(false);
          }}
        />
      )}

      <SideDrawer
        show={drawerIsOpen}
        onClick={() => {
          setDrawerIsOpen(false);
        }}
      >
        <nav className={classes.drawerNav}>
          <NavLinks
            onClick={() => {
              setDrawerIsOpen(false);
            }}
          />
        </nav>
      </SideDrawer>

      <div className={classes.logoBox}>
        <Link to={"/"}>
          <img className={classes.logo} src={logo} alt="img-logo" />
        </Link>
        <span>Share</span>
      </div>

      <nav className={classes.bigScreen}>
        <NavLinks />
      </nav>

      <AiOutlineMenu
        onClick={() => {
          setDrawerIsOpen(true);
        }}
        className={classes.menu}
      />
    </div>
  );
}

export default MainNavigation;
