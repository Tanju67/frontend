import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./NavLinks.module.css";
import Button from "../UiElements/Button";
import { AuthContext } from "../context/auth-context";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";
import { FaDeleteLeft } from "react-icons/fa6";
import personImg from "../../assets/person-icon-8.png";
import Modal from "../UiElements/Modal";
import { useHttpRequest } from "../hooks/useHttpRequest";

function NavLinks(props) {
  const authCtx = useContext(AuthContext);
  const { sendRequest } = useHttpRequest();
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  const showDeleteModalHandler = () => {
    setLogoutMenu(false);
    setDeleteModal(true);
  };

  const confirmDeleteHandler = async () => {
    sendRequest(
      process.env.REACT_APP_BASE_URL +
        `api/v1/auth/user/${authCtx.user.userId}`,
      "DELETE",
      undefined,
      undefined,
      undefined,
      (data) => {
        setDeleteModal(false);
        setLogoutMenu(false);
        authCtx.logout();
        navigate("/");
        console.log(data);
      }
    );
  };

  const menuCloseHandler = async () => {
    setLogoutMenu(false);

    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/auth/logout`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        authCtx.logout();
        navigate("/");
      }
    );
  };

  const profileHandler = () => {
    setLogoutMenu(false);
  };
  return (
    <ul className={classes.navLinks} onClick={props.onClick}>
      <Modal
        show={deleteModal}
        onCancel={closeDeleteModalHandler}
        header="Are You Sure?"
        footer={
          <>
            <Button onClick={closeDeleteModalHandler}>Cancel</Button>
            <Button onClick={confirmDeleteHandler}>Delete</Button>
          </>
        }
      >
        <p className={classes.deleteModalText}>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/places"}
        >
          All Places
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to={`/user-places/${authCtx.user.userId}`}
          >
            My Places
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to={"/add-place"}
          >
            Add Place
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <Button
            className={`${classes.loginBtn} ${({ isActive }) =>
              isActive ? classes.active : ""}`}
            to={"/login"}
          >
            Login
          </Button>
        </li>
      )}

      {authCtx.isLoggedIn && (
        <div className={classes.smallScreenMenu}>
          <p onClick={menuCloseHandler}>Logout</p>
          <Link onClick={profileHandler} to={"/profile/u2"}>
            Profile
          </Link>
          <p onClick={showDeleteModalHandler}>Delete Your Account</p>
        </div>
      )}

      {authCtx.isLoggedIn && (
        <li className={classes.profileMenu}>
          <Button
            onClick={() => {
              setLogoutMenu((prev) => !prev);
            }}
            className={`${classes.logout} ${({ isActive }) =>
              isActive ? classes.active : ""}`}
          >
            <div className={classes.imgBox}>
              <img
                src={
                  authCtx.user.image
                    ? process.env.REACT_APP_BASE_URL + authCtx.user.image
                    : personImg
                }
                alt="profile"
              />
            </div>
            <AiOutlineMenu />
          </Button>
          <CSSTransition
            in={logoutMenu}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames={"modal"}
          >
            <div className={classes.hoverProfile}>
              <div>
                <p onClick={menuCloseHandler}>
                  <RiLogoutCircleLine /> Logout
                </p>
                <Link onClick={profileHandler} to={"/profile/u2"}>
                  <CgProfile /> Profile
                </Link>
                <p onClick={showDeleteModalHandler}>
                  <FaDeleteLeft /> Delete Your Account
                </p>
              </div>
            </div>
          </CSSTransition>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
