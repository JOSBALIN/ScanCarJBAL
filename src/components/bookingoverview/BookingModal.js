import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./BookingModal.css";
import EditIcon from "@mui/icons-material/Edit";
import {createBooking, deleteBooking, updateBooking} from "./BookingsAPI"


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

// Code adapted from https://www.codegrepper.com/code-examples/javascript/generate+3+letter+random+letters+js
// Used to generate random license plates
function getRandomString() {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var randomNums = '0123456789';
  var result = '';
  for ( var i = 0; i < 3; i++ ) {
    result += randomNums.charAt(Math.floor(Math.random() * randomChars.length));
  }
  for ( var i = 0; i < 3; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}


export default function BookingModal(props) {

  
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const isNew = props.isNew;
  const currentBookingID = props.lastBookingID+1;


  const name = React.createRef(); 
  const phoneNumber = React.createRef();   
  const address = React.createRef();
  const group = React.createRef();
  const dropOffTime = React.createRef()
  const dropOffDate = React.createRef();
  const dropOffLocation = React.createRef();
  const pickupTime = React.createRef();
  const pickupDate = React.createRef();
  const pickupLocation = React.createRef();
  const customerLicenseID = React.createRef();
  const status = React.createRef();

  const handleClickNew = () => {
    const prop = {
      bookingID: currentBookingID,
      fullName: name.current.value,
      address: address.current.value,
      phoneNumber: phoneNumber.current.value,
      licensePlate: getRandomString(),
      customerLicenseID: customerLicenseID.current.value,
      carGroup: group.current.value,
      pickupDate: new Date(pickupDate.current.value + " " + pickupTime.current.value),
      dropOffDate: new Date(dropOffDate.current.value + " " + dropOffTime.current.value),
      pickupLocation: pickupLocation.current.value,
      dropOffLocation: dropOffLocation.current.value,
    };
    // 
    createBooking(prop)
      handleClose();
    
  };

  const handleClickUpdate = () => {
    console.log(props.o.bookingID);
    const prop = {
      objectID: props.o.objectID,
      fullName: name.current.value,
      address: address.current.value,
      phoneNumber: phoneNumber.current.value,
      licensePlate: getRandomString(),
      customerLicenseID: customerLicenseID.current.value,
      carGroup: group.current.value,
      pickupDate: new Date(pickupDate.current.value + " " + pickupTime.current.value),
      dropOffDate: new Date(dropOffDate.current.value + " " + dropOffTime.current.value),
      pickupLocation: pickupLocation.current.value,
      dropOffLocation: dropOffLocation.current.value,
      status: status.current.value
    };
    updateBooking(prop);
    handleClose();
  };


  var today = new Date();
  today.setDate(today.getDate() + 3);
  var date = today.toISOString().substr(0, 10);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function alertDelete(props) {
    if(window.confirm("Are you sure you want to delete this entry?\nThis cannot be undone") == true){
        deleteBooking(props)
    };
  }

  function ModalButton() {
    if (isNew) {
      return (
        <Button id="newBooking" onClick={handleOpen}>
          + New Booking
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
            <h3>{isNew ? "New Booking" : "Edit Booking"}</h3>
          </div>
          <div className="module">
            <div className="row" id="customerInformationTop">
              {" "}
              <div className="column">
                <h4>Customer information</h4>
              </div>
              <div className="column" id="cartype">
                {isNew ? (
                  <h5>BookingID: {currentBookingID}</h5>
                ) : (
                  <h5>BookingID: {props.o.id}</h5>
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
                    ref={phoneNumber}
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
                    name="License ID"
                    ref={customerLicenseID}
                    defaultValue={props.o.licenseID}
                  />
                </p>
              </form>
            </div>
          </div>
          <div className="module">
            <div className="row" id="customerInformationTop">
              <div className="column">
                <h4>Pick-up & return</h4>
              </div>
              <div className="column" id="cartype">
                <h4>Car information</h4>
              </div>
            </div>
            <div>
              <form className="row" id="bookinginformation">
                <div className="column">
                  <p>
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      ref={pickupDate}
                      defaultValue={isNew ? date : props.o.pickupDate}
                    />
                  </p>
                  <p>
                    <input
                      type="date"
                      name="date"
                      ref={dropOffDate}
                      defaultValue={props.o.returnDate}
                    />
                  </p>
                </div>
                <div className="column">
                  <p>
                    <label>Time</label>
                    <input
                      type="time"
                      step="3600000"
                      className="time"
                      name="appt"
                      ref={pickupTime}
                      defaultValue={props.o.pickupTime}
                      min="07:00"
                      max="21:00"
                      required
                    />
                  </p>
                  <p>
                    <input
                      type="time"
                      step="3600000"
                      className="time"
                      name="appt"
                      defaultValue={props.o.returnTime}
                      min="07:00"
                      max="21:00"
                      required
                      ref={dropOffTime}
                    />
                  </p>
                </div>
                <div className="column">
                  <p>
                    <label>Location</label>
                    <select
                      name="location"
                      id="location"
                      ref={pickupLocation}
                    >
                      <option value="Nordhavn">Nordhavn</option>
                      <option value="Sydhavn">Sydhavn</option>
                      <option value="Amager">Amager</option>
                    </select>
                  </p>
                  <p>
                    <select
                      name="location"
                      id="location"
                      ref={dropOffLocation}
                    >
                      <option value="Nordhavn">Nordhavn</option>
                      <option value="Sydhavn">Sydhavn</option>
                      <option value="Amager">Amager</option>
                    </select>
                  </p>
                </div>
                <div className="column" id="carinformation">
                  <p>
                    <label>Group</label>
                    <select
                      name="location"
                      id="location"
                      ref={group}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                  </p>
                  <p id="licenseplateform">
                    <label>Plate #</label>
                    <input type="text" />
                  </p>
                  {isNew ? (
                    ""
                  ) : (
                    <p>
                      <select
                        name="status"
                        id="status"
                        ref={status}
                        defaultValue={props.o.carStatus}
                      >
                        <option value="Awaiting Transfer">Delivered</option>
                        <option value="Ready">Ready</option>
                        <option value="Picked-up">Picked up</option>
                        <option value="Returned">Returned</option>
                        <option value="Not returned">Not returned</option>
                      </select>
                    </p>
                  )}
                </div>
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
                Delete booking
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
