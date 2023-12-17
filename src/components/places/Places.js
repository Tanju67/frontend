import React from "react";
import Place from "./Place";
import classes from "./Places.module.css";
import usePagination from "../../shared/hooks/usePagination";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";

function Places(props) {
  const data = props.data.length === 0 ? [] : props.data.places;
  const [currentItems, pagination] = usePagination(6, data);

  if (currentItems.length === 0) {
    return (
      <div className="noFound">
        {props.isLoading && <LoadingSpinner asOverlay />}
        {!props.isLoading && <h2>No places found</h2>}
      </div>
    );
  }
  return (
    <div className={classes.places}>
      <ErrorModal error={props.error} onClear={props.clearErrorHandler} />
      {props.isLoading && <LoadingSpinner asOverlay />}
      {currentItems.map((item) => (
        <Place
          key={item._id}
          id={item._id}
          creator={item.creator}
          date={item.createdAt}
          address={item.address}
          title={item.title}
          description={item.description}
          image={item.image}
          userImg={item.creatorImg}
        />
      ))}
      {pagination}
    </div>
  );
}

export default Places;
