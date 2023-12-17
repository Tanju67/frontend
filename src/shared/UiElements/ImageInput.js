import React, { useEffect, useState } from "react";
import classes from "./ImageInput.module.css";

function ImageInput(props) {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    setIsTouched(true);
    setIsValid(true);
  };
  const touchHandler = () => {
    setIsTouched(true);
  };

  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, file, isValid);
  }, [id, file, isValid, onInput]);
  return (
    <div
      className={`${classes.formControl} ${
        !isValid && isTouched ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type="file"
        accept=".jpg,.png,.jpeg"
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
      {!isValid && isTouched && (
        <p className={classes.error}>{props.errorMsg}</p>
      )}
    </div>
  );
}

export default ImageInput;
