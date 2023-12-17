import React, { useState } from "react";
import classes from "./UserPlaces.module.css";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import Button from "../../shared/UiElements/Button";
import UserPlacePhoto from "./UserPlacePhoto";
import UserPlacesDetail from "./UserPlacesDetail";
import PlaceDetail from "./PlaceDetail";

function UserPlaces({ places, detail, isLoading, error, clearErrorHandler }) {
  const userId = useParams().uid;
  const [photoMode, setPhotoMod] = useState(false);

  if (places.length === 0) {
    return (
      <div className={classes.page}>
        <Profile id={userId} />
        <div className={classes.placesContainer}>
          <div className={classes.noFound}>
            <h2 className="center">No place found.</h2>
            <Button to={"/add-place"}>Add New Place</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.page}>
      {!detail && !photoMode && (
        <UserPlacesDetail
          userId={userId}
          places={places}
          setPhotoMod={setPhotoMod}
        />
      )}

      {detail && (
        <PlaceDetail
          places={places}
          error={error}
          isLoading={isLoading}
          clearErrorHandler={clearErrorHandler}
        />
      )}

      {!detail && photoMode && (
        <UserPlacePhoto
          userId={userId}
          places={places}
          setPhotoMod={setPhotoMod}
        />
      )}
    </div>
  );
}

export default UserPlaces;
