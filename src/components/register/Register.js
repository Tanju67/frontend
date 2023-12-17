import React from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import Button from "../../shared/UiElements/Button";
import SignupImg from "../../assets/undraw_authentication_re_svpt.svg";
import classes from "./register.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";

function Register() {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const navigate = useNavigate();
  const [inputHandler, formState] = useForm({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });

  const submithandler = async (e) => {
    e.preventDefault();

    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/auth/register`,
      "POST",
      {
        name: formState.name.value,
        email: formState.email.value,
        password: formState.password.value,
      },
      "include",
      { "Content-Type": "application/json" },
      () => {
        navigate("/login");
      }
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />

      <Form
        onSubmit={submithandler}
        className={classes.register}
        title="Sign Up"
        text="Do you have already an account?"
        link="login"
        linkTitle="Login"
        img={SignupImg}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          placeholder="Name"
          errorMsg="Please enter a valid name!"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          placeholder="Email"
          errorMsg="Please enter a valid email!"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
          onReset
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          placeholder="Password"
          errorMsg="Please enter a valid password!"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(6)]}
          onReset
        />
        <Button disabled={!formState.isValid} type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default Register;
