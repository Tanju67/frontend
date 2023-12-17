import React, { useContext, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import personImg from "../../assets/person-icon-8.png";
import { IoPersonCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/UiElements/Button";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";

function Profile(props) {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const [user, setUser] = useState({});
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (!props.id) {
      return;
    }
    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/auth/user/${props.id}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        if (authCtx.user.userId === data._id) {
          authCtx.setUser((prev) => {
            return {
              ...prev,
              image: data.profile.length > 0 ? data.profile[0].image : null,
            };
          });
        }
        setUser({
          name:
            data.profile.length > 0
              ? `${data.profile[0].firstName} ${data.profile[0].lastName}`
              : data.name,
          email: data.email,
          age: data.profile.length > 0 ? data.profile[0].birthYear : null,
          address: data.profile.length > 0 ? data.profile[0].address : null,
          country: data.profile.length > 0 ? data.profile[0].country : null,
          image: data.profile.length > 0 ? data.profile[0].image : null,
        });
      }
    );
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <div className={classes.profile}>
        <div className={classes.imgBox}>
          {isLoading && <LoadingSpinner asOverlay />}
          <img
            src={
              user.image
                ? process.env.REACT_APP_BASE_URL + user.image
                : personImg
            }
            alt={props.title}
          />
        </div>
        <div className={classes.informationBox}>
          <p style={{ textTransform: "capitalize" }}>
            <IoPersonCircle />
            {user.name}
          </p>
          <p>
            <MdEmail />
            {user.email}
          </p>
          {user.age && (
            <p>
              <FaBirthdayCake />
              {user.age}
            </p>
          )}
          {user.address && (
            <p style={{ textTransform: "capitalize" }}>
              <FaRegAddressCard /> {user.address}
            </p>
          )}
          {user.country && (
            <p style={{ textTransform: "capitalize" }}>
              <IoEarthSharp /> {user.country}
            </p>
          )}
          {props.sharedPlaceCount && (
            <p>
              <IoMdPhotos />
              {props.sharedPlaceCount || "0"} Shared Photos
            </p>
          )}

          {props.show && (
            <div className={classes.btnBox}>
              <Button onClick={() => props.onSetPhotoMode(true)}>
                Only Photo
              </Button>
              <Button onClick={() => props.onSetPhotoMode(false)}>
                Detail
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
