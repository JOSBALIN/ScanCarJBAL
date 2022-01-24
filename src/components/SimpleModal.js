import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./SimpleModal.css";
import EditIcon from "@mui/icons-material/Edit";
import {createBooking, deleteBooking, updateBooking} from "./bookingoverview/BookingsAPI"


const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 800,
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


export default function SimpleModal(props) {

  
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const isNew = props.isNew;
  const currentBookingID = props.lastBookingID+1;


  const [name,setName]= React.useState('')
  const [phoneNumber,setPhoneNumber]= React.useState('')
  const [address,setAddress]= React.useState('')
  const [group,setGroup]= React.useState('A')
  const [dropOffTime,setDropOffTime]= React.useState('')  
  const [dropOffDate,setDropOffDate]= React.useState('')
  const [dropOffLocation,setDropOffLocation]= React.useState('Nordhavn')
  const [pickupTime,setPickupTime]= React.useState('')  
  const [pickupDate,setPickupDate]= React.useState('')
  const [pickupLocation,setPickupLocation]= React.useState('Nordhavn')
  const [customerLicenseID,setCustomerLicenseID]= React.useState('')    

  const handleClickNew = () => {
    const prop = {bookingID: currentBookingID, fullName:name, address:address, phoneNumber:phoneNumber, licensePlate: getRandomString(), customerLicenseID:customerLicenseID, carGroup:group, pickupDate: new Date(pickupDate + " " + pickupTime), dropOffDate: new Date(dropOffDate + " " + dropOffTime), pickupLocation: pickupLocation, dropOffLocation: dropOffLocation}
    createBooking(prop)
    handleClose()
  }

  const handleClickUpdate = () => {
    const prop = {bookingID: currentBookingID, fullName:name, address:address, phoneNumber:phoneNumber, licensePlate: getRandomString(), customerLicenseID:customerLicenseID, carGroup:group, pickupDate: new Date(pickupDate + " " + pickupTime), dropOffDate: new Date(dropOffDate + " " + dropOffTime), pickupLocation: pickupLocation, dropOffLocation: dropOffLocation}
    updateBooking(prop)
    handleClose()
  }


  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handlecustomerLicenseIDChange = (event) => {
    setCustomerLicenseID(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleDropOffTimeChange = (event) => {
    setDropOffTime(event.target.value);
  }

  const handleDropOffDateChange = (event) => {
    setDropOffDate(event.target.value);
  }

  const handlePickupTimeChange = (event) => {
    setPickupTime(event.target.value);
  }

  const handlePickupDateChange = (event) => {
    setPickupDate(event.target.value);
  }
  const handleDropOffLocationChange = (event) => {
    setDropOffLocation(event.target.value);
  }
  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  }


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
              { isNew ? <h5>BookingID: {currentBookingID}</h5> : <h5>BookingID: {props.o.id}</h5> }
              </div>
            </div>
            <div>
              <form className="row" id="bookinginformation">
                <p>
                  <label>Name</label>
                  <input type="text" name="Name" defaultValue={props.o.name} onChange={handleNameChange}/>
                </p>
                <p>
                  <label>Phone Number</label>
                  <input type="text" name="Phone Number" defaultValue={isNew ? "+45 " : props.o.phoneNum} onChange={handlePhoneNumberChange} />
                </p>
                <p>
                  <label>Address</label>
                  <input type="text" name="Address" defaultValue={props.o.address} onChange={handleAddressChange}/>
                </p>
                <p>
                  <label>License ID</label>
                  <input type="text" name="License ID" defaultValue={props.o.licenseID} onChange={handlecustomerLicenseIDChange}/>
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
                      <input type="date" name="date" defaultValue={props.o.pickupDate}  onChange={handlePickupDateChange}/>
                    </p> 
                    <p>
                      <input type="date" name="date" defaultValue={props.o.returnDate}  onChange={handleDropOffDateChange} />
                    </p> 
                  </div>
                  <div className="column">
                    <p>
                      <label>Time</label>
                      <input type="time" step="3600000" className="time" name="appt" defaultValue={props.o.pickupTime}
                        min="07:00" max="21:00" required onChange={handlePickupTimeChange}/>
                    </p>
                    <p>
                      <input type="time" step="3600000" className="time" name="appt" defaultValue={props.o.returnTime}
                        min="07:00" max="21:00" required onChange={handleDropOffTimeChange}/>
                    </p>
                  </div>
                  <div className="column">
                    <p>
                      <label>Location</label>
                      <select name="location" id="location" onChange={handlePickupLocationChange}>
                        <option value="Nordhavn">Nordhavn</option>
                        <option value="Sydhavn">Sydhavn</option>
                        <option value="Amager">Amager</option>
                      </select>
                    </p>
                    <p>
                      <select name="location" id="location" onChange={handleDropOffLocationChange}>
                        <option value="Nordhavn">Nordhavn</option>
                        <option value="Sydhavn">Sydhavn</option>
                        <option value="Amager">Amager</option>
                      </select>
                    </p>
                  </div>
                  <div className="column" id="carinformation">
                    <p>
                      <label>Group</label>
                      <select name="location" id="location" onChange={handleGroupChange}>
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
                      <input type="text"/>
                    </p>
                    {isNew ? (
                        ""
                      ) : (
                      <p>
                        <select name="status" id="status" defaultValue={props.o.carStatus}>
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
            <button className = "modalButton" id="cancelButton" onClick={() => { handleClickUpdate() }}>Cancel</button>
            {isNew ? (
              <p onClick={() => { handleClickUpdate() }} id="deleteButton">
              CLICK TO CREATE BOOKING
            </p>
            ) : (
              <p onClick={() => { alertDelete(props.o.id) }} id="deleteButton">
                Delete booking
              </p>
            )}
            <button className = "modalButton" id="confirmButton" onClick={() => { handleClickNew() }}>
            {isNew ? "Confirm" : "Edit"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
