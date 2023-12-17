import React from "react";
import classes from "./UserPlacePhoto.module.css";
import Profile from "./Profile";
import ColItem from "./ColItem";

function UserPlacePhoto(props) {
  return (
    <>
      <Profile
        id={props.userId}
        sharedPlaceCount={props.places.length}
        show={true}
        onSetPhotoMode={props.setPhotoMod}
      />
      <ul className={classes.placesContainer}>
        <div className={classes.columnBox}>
          <ColItem colIndex={0} places={props.places} />
          <ColItem colIndex={1} places={props.places} />
          <ColItem colIndex={2} places={props.places} />
        </div>
      </ul>
    </>
  );
}

export default UserPlacePhoto;
