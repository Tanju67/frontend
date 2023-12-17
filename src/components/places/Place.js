import React, { useContext } from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./Place.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import PlaceHeader from "./PlaceHeader";
import PlaceContent from "./PlaceContent";
import PlaceFooter from "./PlaceFooter";

function Place(props) {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.placeItem}>
      <PlaceHeader date={props.date} creator={props.creator} />
      <PlaceContent title={props.title} image={props.image} />
      {authCtx.isLoggedIn && <PlaceFooter id={props.id} />}
    </Card>
  );
}

export default Place;
