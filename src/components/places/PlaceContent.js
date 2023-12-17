import React from "react";
import classes from "./PlaceContent.module.css";

function PlaceContent(props) {
  return (
    <div className={classes.placeBox}>
      <img
        src={process.env.REACT_APP_BASE_URL + props.image}
        alt={props.title}
      />
      <h3>{props.title}</h3>
    </div>
  );
}

export default PlaceContent;
