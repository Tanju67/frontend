import React, { useContext, useState } from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import Button from "../../shared/UiElements/Button";
import classes from "./Profile.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ImageInput from "../../shared/UiElements/ImageInput";
import { AuthContext } from "../../shared/context/auth-context";

function Profile(props) {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [inputHandler, formState] = useForm(props.initialState);

  const clearErrorHandler = () => {
    setError(null);
  };

  const submithandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstName", formState.name.value);
    formdata.append("lastName", formState.lastname.value);
    formdata.append("birthYear", formState.birthyear.value);
    formdata.append("country", formState.birthcountry.value);
    formdata.append("address", formState.address.value);
    formdata.append("image", formState.image.value);

    try {
      setIsLoading(true);
      const res = await fetch(
        process.env.REACT_APP_BASE_URL + `api/v1/profile`,
        {
          method: "POST",
          body: formdata,
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message);
      }
      authCtx.setUser((prev) => {
        return { ...prev, image: data.image };
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Form
        onSubmit={submithandler}
        className={classes.profile}
        title={
          !props.initialState.isValid ? "Add New Profile" : "Update Profile"
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="First Name"
          placeholder="Your name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.name.isValid}
          value={formState.name.value}
        />
        <Input
          id="lastname"
          element="input"
          type="text"
          label="Last Name"
          placeholder="Your last name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.lastname.isValid}
          value={formState.lastname.value}
        />
        <Input
          id="birthyear"
          element="input"
          type="date"
          label="Birth Year"
          placeholder="Your birth year"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.birthyear.isValid}
          value={formState.birthyear.value}
        />

        <Input
          id="birthcountry"
          element="input"
          type="text"
          label="Birth Country"
          placeholder="Where are you from?"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.birthcountry.isValid}
          value={formState.birthcountry.value}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          placeholder="Your address"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.address.isValid}
          value={formState.address.value}
        />
        <ImageInput
          id="image"
          element="text"
          label="Image"
          placeholder="Upload image"
          errorMsg="Please enter a valid image!"
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid} type="submit">
          {!props.initialState.isValid ? "Add New Profile" : "Update Profile"}
        </Button>
      </Form>
    </>
  );
}

export default Profile;
