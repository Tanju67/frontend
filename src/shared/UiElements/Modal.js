import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import classes from ".//Modal.module.css";

function ModalOverlay(props) {
  const content = (
    <div className={classes.modal}>
      <header className={classes.header}>{props.header}</header>
      <div className={classes.content}>{props.children}</div>
      <footer className={classes.footer}>{props.footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("overlay-hook")
  );
}

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop show={props.show} onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={"modal"}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}

export default Modal;
