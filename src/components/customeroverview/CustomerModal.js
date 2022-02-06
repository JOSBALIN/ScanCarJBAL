import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./CustomerModal.css";
import EditIcon from "@mui/icons-material/Edit";
import { createCustomer, deleteCustomer, updateCustomer } from "./CustomersAPI";

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
}));

export default function CustomerModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const isNew = props.isNew;
  const emptyRecord = {};

  const name = React.createRef();
  const phoneNum = React.createRef();
  const address = React.createRef();
  const licenseID = React.createRef();

  const handleClickNew = () => {
    const prop = {
      name: name.current.value,
      address: address.current.value,
      phoneNum: phoneNum.current.value,
      licenseID: licenseID.current.value,
    };
    //
    console.log(prop)
    createCustomer(prop);
    handleClose();
  };

  const handleClickUpdate = () => {
    const prop = {
      name: name.current.value,
      address: address.current.value,
      phoneNum: phoneNum.current.value,
    };
    //
    updateCustomer(prop);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
    console.log(props)
  };

  const handleClose = () => {
    setOpen(false);
  };

  function alertDelete(props) {
    if (
      window.confirm(
        "Are you sure you want to delete this entry?\nThis cannot be undone"
      ) == true
    ) {
      deleteCustomer(props);
    }
  }

  function ModalButton() {
    if (isNew) {
      return (
        <Button id="newBooking" onClick={handleOpen}>
          + New Customer
        </Button>
        
      );
    } else {
      return (
        <Button id="editButton" onClick={handleOpen}>
          <EditIcon />
        </Button>
      );
    }
  }

  return (
    <div className="backgroundDiv">
      <ModalButton />

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper} id="modalDiv">
          <div className="modalTitle">
            {" "}
            <h3>{isNew ? "New Booking" : "Edit Customer"}</h3>
          </div>
          <div className="module">
            <div className="row" id="customerInformationTop">
              {" "}
              <div className="column">
                <h4>Customer information</h4>
              </div>
              <div className="column" id="cartype">
                {isNew ? (
                  "New Customer"
                ) : (
                  <h5>license ID: {props.o.id}</h5>
                )}
              </div>
            </div>
            <div>
              <form className="row" id="bookinginformation">
                <p>
                  <label>Name</label>
                  <input
                    type="text"
                    name="Name"
                    ref={name}
                    defaultValue={props.o.name}
                  />
                </p>
                <p>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="Phone Number"
                    ref={phoneNum}
                    defaultValue={isNew ? "+45 " : props.o.phoneNum}
                  />
                </p>
                <p>
                  <label>Address</label>
                  <input
                    type="text"
                    name="Address"
                    ref={address}
                    defaultValue={props.o.address}
                  />
                </p>
                <p>
                  <label>License ID</label>
                  <input
                    type="text"
                    name="licenseID"
                    ref={licenseID}
                    defaultValue={props.o.id}
                    disabled={!isNew}
                  />
                </p>
              </form>
            </div>
          </div>

          <div id="buttonDiv">
            <button
              className="modalButton"
              id="cancelButton"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            {isNew ? (
              ""
            ) : (
              <p
                onClick={() => {
                  alertDelete(props.o.id);
                }}
                id="deleteButton"
              >
                Delete customer
              </p>
            )}

            {isNew ? (
              <button
                className="modalButton"
                id="confirmButton"
                onClick={() => {
                  handleClickNew();
                }}
              >
                Confirm
              </button>
            ) : (
              <button
                className="modalButton"
                id="confirmButton"
                onClick={() => {
                  handleClickUpdate();
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
