import React, { useContext, useEffect, useState } from "react";
import Profile from "../components/profile/Profile";
import { useHttpRequest } from "../shared/hooks/useHttpRequest";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/UiElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../shared/UiElements/LoadingSpinner/ErrorModal";

function ProfilePage() {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/profile/${authCtx.user.userId}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        const initialState = {
          name: {
            value: data.profile[0]?.firstName,
            isValid: data.profile.length > 0 ? true : false,
          },
          lastname: {
            value: data.profile[0]?.lastName,
            isValid: data.profile.length > 0 ? true : false,
          },
          birthyear: {
            value: data.profile[0]?.birthYear,
            isValid: data.profile.length > 0 ? true : false,
          },
          birthcountry: {
            value: data.profile[0]?.country,
            isValid: data.profile.length > 0 ? true : false,
          },
          address: {
            value: data.profile[0]?.address,
            isValid: data.profile.length > 0 ? true : false,
          },
          isValid: data.profile.length > 0 ? true : false,
        };

        setProfile(initialState);
      }
    );
  }, []);

  if (!profile) return;

  return (
    <div>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && <Profile initialState={profile} />}
    </div>
  );
}

export default ProfilePage;
