import React, { useEffect, useState } from "react";
import AddPlace from "../add-place/AddPlace";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";

function UpdatePlace() {
  const { sendRequest } = useHttpRequest();
  const [place, setPlace] = useState([]);
  const placeId = useParams().pid;

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/place/${placeId}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        setPlace([{ ...data.place }]);
      }
    );
  }, []);

  if (place.length === 0) {
    return (
      <div className="center">
        <h2>No place found.</h2>
      </div>
    );
  }

  const initialState = {
    title: { value: place[0].title, isValid: true },
    description: { value: place[0].description, isValid: true },
    isValid: true,
  };

  return (
    <>
      <AddPlace initialState={initialState} update={true} placeId={placeId} />
    </>
  );
}

export default UpdatePlace;
