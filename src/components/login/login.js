import React, { useContext } from "react";
import Input from "../../shared/UiElements/Input";
import LoginImg from "../../assets/undraw_secure_login_pdn4.svg";
import Button from "../../shared/UiElements/Button";
import Form from "../../shared/UiElements/Form";
import classes from "./login.module.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";

function Login() {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const navigate = useNavigate();

  const [inputHandler, formState] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });

  const submithandler = async (e) => {
    e.preventDefault();

    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/auth/login`,
      "POST",
      {
        email: formState.email.value,
        password: formState.password.value,
      },
      "include",
      { "Content-Type": "application/json" },
      (data) => {
        console.log(data);
        authCtx.login({
          userId: data.user._id,
          name: data.user.name,
          image: data.user.profile[0]?.image,
        });
        navigate("/");
      }
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Form
        onSubmit={submithandler}
        className={classes.login}
        title="Login"
        text="Doesn't have an account yet?"
        link="register"
        linkTitle="Sign Up"
        img={LoginImg}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          placeholder="Email"
          errorMsg="Please enter a valid email!"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
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
        />
        <Button disabled={!formState.isValid} type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;
