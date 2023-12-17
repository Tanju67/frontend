import React from "react";
import classes from "./UserPlacesDetail.module.css";
import Profile from "./Profile";
import UserPlaceItem from "./UserPlaceItem";

function UserPlacesDetail({ userId, places, setPhotoMod }) {
  return (
    <>
      <Profile
        id={userId}
        sharedPlaceCount={places.length}
        show={true}
        onSetPhotoMode={setPhotoMod}
      />
      <ul className={classes.placesContainer}>
        {places.map((place) => {
          return (
            <UserPlaceItem
              key={place._id}
              id={place._id}
              title={place.title}
              address={place.address}
              description={place.description}
              image={place.image}
              creator={place.creator}
              location={place.location}
            />
          );
        })}
      </ul>
    </>
  );
}

export default UserPlacesDetail;
