import React, { useContext, useState } from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./UserPlaceItem.module.css";
import Button from "../../shared/UiElements/Button";
import Modal from "../../shared/UiElements/Modal";
import Map from "../../shared/UiElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import { useNavigate } from "react-router-dom";

function UserPlaceItem(props) {
  const { sendRequest } = useHttpRequest();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const displayModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showDeleteModalHandler = () => {
    setDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  const confirmDeleteHandler = () => {
    sendRequest(
      process.env.REACT_APP_BASE_URL + `api/v1/place/${props.id}`,
      "DELETE"
    );
    setDeleteModal(false);
    navigate(`/`);
  };
  return (
    <>
      <li>
        <Card className={classes.place}>
          <div className={classes.placeBox}>
            <img
              src={process.env.REACT_APP_BASE_URL + props.image}
              alt={props.title}
            />
            <h3>{props.title}</h3>
            <p className={classes.desc}>{props.description}</p>
            <p className={classes.address}>{props.address}</p>
            <hr />
            <div className={classes.action}>
              <Button onClick={displayModalHandler}>View on map</Button>
              {authCtx.user.userId === props.creator && (
                <>
                  <Button inverse to={`/user-places/edit/${props.id}`}>
                    Edit
                  </Button>
                  <Button danger onClick={showDeleteModalHandler}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </li>

      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={props.title}
        footer={<Button onClick={closeModalHandler}>Close</Button>}
      >
        <Map center={props.location} zoom={13} />
      </Modal>

      <Modal
        show={deleteModal}
        onCancel={closeDeleteModalHandler}
        header="Are You Sure?"
        footer={
          <>
            <Button onClick={closeDeleteModalHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p className={classes.deleteModalText}>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
    </>
  );
}

export default UserPlaceItem;
