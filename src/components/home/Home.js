import React, { useContext } from "react";

import classes from "./Home.module.css";

import HeaderImage from "../../assets/headerImage.svg";
import Button from "../../shared/UiElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

function Home() {
  const authCtx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <div className={classes["header_text-box"]}>
        <h1>
          The<span>Wonderful</span>World
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque
          convallis a cras semper auctor. Lectus sit amet est placerat in
          egestas.
        </p>

        <Button
          to={
            authCtx.isLoggedIn ? `user-places/${authCtx.user.userId}` : `login`
          }
        >
          Discover
        </Button>
      </div>
      <div className={classes["header_img-box"]}>
        <img src={HeaderImage} alt="img" />
      </div>
    </header>
  );
}

export default Home;
