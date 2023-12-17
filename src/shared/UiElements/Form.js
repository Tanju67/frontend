import React from "react";
import Card from "./Card";
import classes from "./Form.module.css";
import { Link } from "react-router-dom";

function Form(props) {
  return (
    <div className={`${classes.page} ${props.className}`}>
      <Card className={classes.auth}>
        <form onSubmit={props.onSubmit} className={classes.form}>
          <h2>{props.title}</h2>
          <p>
            {props.text} <Link to={`/${props.link}`}>{props.linkTitle}</Link>{" "}
          </p>
          <div>{props.children}</div>
        </form>
        {props.img && (
          <div className={classes.imgBox}>
            <img src={props.img} alt={props.title} />
          </div>
        )}
      </Card>
    </div>
  );
}

export default Form;
