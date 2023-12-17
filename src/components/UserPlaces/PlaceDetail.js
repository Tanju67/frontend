import React from "react";
import Profile from "./Profile";
import classes from "./PlaceDetail.module.css";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import UserPlaceItem from "./UserPlaceItem";

function PlaceDetail({ places, error, clearErrorHandler, isLoading }) {
  return (
    <>
      <Profile id={places.creator} sharedPlaceCount={false} />
      <ul className={classes.placesContainer}>
        <ErrorModal error={error} onClear={clearErrorHandler} />
        {isLoading && <LoadingSpinner asOverlay />}
        <UserPlaceItem
          key={places._id}
          id={places._id}
          address={places.address}
          title={places.title}
          description={places.description}
          image={places.image}
          creator={places.creator}
          location={places.location}
        />
      </ul>
    </>
  );
}

export default PlaceDetail;
