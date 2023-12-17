import React from "react";
import Button from "../../shared/UiElements/Button";
import classes from "./PlaceFooter.module.css";

function PlaceFooter(props) {
  return (
    <div className={classes.actions}>
      <hr />
      <Button to={props.id}>DETAIL</Button>
    </div>
  );
}

export default PlaceFooter;
