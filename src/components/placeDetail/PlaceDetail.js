import React, { useEffect, useState } from "react";
import UserPlaces from "../UserPlaces/UserPlaces";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";

function PlaceDetail() {
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
        setPlace(data.place);
      }
    );
  }, []);

  return <UserPlaces places={place} detail={true} />;
}

export default PlaceDetail;
