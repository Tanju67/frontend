import React, { useContext, useEffect, useState } from "react";
import classes from "./PlaceHeader.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import personImg from "../../assets/person-icon-8.png";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";

function PlaceHeader({ date, creator }) {
  const authCtx = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpRequest();
  const [profileData, setProfileData] = useState({});

  const dateContent = new Date(date).toLocaleDateString("de-DE");

  const content = {
    name:
      profileData.profile?.length > 0
        ? `${profileData.profile[0].firstName} ${profileData.profile[0].lastName}`
        : profileData.name,
    image:
      profileData.profile?.length > 0
        ? process.env.REACT_APP_BASE_URL + profileData.profile[0].image
        : personImg,
  };

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/auth/user/${creator}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        setProfileData(data);
      }
    );
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={classes.userBox}>
          <div className={classes.userProfile}>
            <div className={classes.imgBox}>
              <Link
                to={authCtx.user?.userId ? `/user-places/${creator}` : "/login"}
              >
                <img src={content.image} alt={"user img"} />
              </Link>
            </div>
            <span>{content.name}</span>
          </div>
          <div className={classes.postDate}>
            <span>{dateContent}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaceHeader;
