import * as React from "react";
//import logo from "../logo.svg";
import "./BookingOverview.css";
import "../App.css";
import CheckBoxes from "../components/bookingoverview/Checkboxes";
import GridTable from "../components/bookingoverview/BookingOverviewTable";
import {getAllBookings} from "../components/bookingoverview/BookingsAPI";
import "reactjs-popup/dist/index.css";
import BookingModal from "../components/bookingoverview/BookingModal";
import CustomerModal from "../components/customeroverview/CustomerModal";
import CustomerOverviewModal from "../components/customeroverview/CustomerOverviewModal";
import { listItemAvatarClasses } from "@mui/material";



function BookingOverview() {
  const [visible, setVisible] = React.useState(false);

  const [listOfBookings, setListOfBookings] = React.useState([]);
  const [lastBookingID, setLastBookingID] = React.useState([]);
    
    React.useEffect(async() => { 
      const allBookings = await getAllBookings();
      setListOfBookings(allBookings);
      setLastBookingID(allBookings[allBookings.length - 1].bookingID)
    }, [])

  const emptyRecord = {
  };



  function HandleGridUpdate(){
    console.log("HASHDAHSD")
        React.useEffect(async() => { 
      const allBookings = await getAllBookings();
      setListOfBookings(allBookings);
      setLastBookingID(allBookings[allBookings.length - 1].bookingID)
    }, [])


  }

  return (
    <div className="Background">
        <div className="canvas">
          <div className="moduletitle" id="bookingOverview">
            <h2>Booking Overview</h2>
          </div>
          <div className="module" id="filtersmodule">
            <div className="row">
              <div className="column">
                <h3>Filter Bookings</h3>
              </div>
              <div>
                <BookingModal o={emptyRecord} isNew={true} isOpen={false} lastBookingID={lastBookingID} update={HandleGridUpdate()}/>
              </div>
            </div>
            <div className="row">
              <form id="filterform">
                <p>
                  <label>Booking ID</label>
                  <input type="text" name="Booking ID" />
                </p>
                <p>
                  <label>Phone Number</label>
                  <input type="text" name="Phone Number" />
                </p>
                <p>
                  <label>Name</label>
                  <input type="text" name="Name" />
                </p>
                <p>
                  <label>Address</label>
                  <input type="text" name="Address" />
                </p>
                <p>
                </p>
              </form>
            </div>
            <CustomerOverviewModal/>
            
          
            <button onClick={() => setVisible(!visible)} id="advfilters">
              {visible ? "v   Advanced Filters" : ">   Advanced Filters"}
            </button>
          </div>
          {visible && (
            <div className="module" id="advfiltersmodule">
                <div className="row">
                  
                  <div className="column">
                  <h2>Car information</h2>
                      <form id="advfilterform">
                        <p>
                          <label>License Plate</label>
                          <input type="text" name="License Plate" />
                        </p>
                        <p>
                          <label>Driver's License</label>
                          <input type="text" name="Driver's License" />
                        </p>
                      </form>
                      <CheckBoxes />
                  </div>
                  <div className="column">
                    <h2>Pick-up & Return</h2>
                    <div className="row">
                      <div className="column">
                      <label htmlFor="pickupDate">Pick-up date:</label>

                      <input type="date" id="pickupDate" name="rent-pickup"
                            min="2022-01-01" max="2023-12-31"/>
                      </div>
                      <div className="column">
                      <label htmlFor="pickupTime">Pick-up time:</label>

                      <input type="time" step="3600000" id="pickupTime" name="appt"
                            min="07:00" max="21:00" required/>
                      </div>
                      <div className="column">
                        Location
                        <div id="location1">
                          <select name="location" id="location">
                              <option value="Nordhavn">Nordhavn</option>
                            <option value="Sydhavn">Sydhavn</option>
                            <option value="Amager">Amager</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="column">
                      <label htmlFor="return">Return date:</label>

                      <input type="date" id="return" name="rent-return"
                            min="2022-01-01" max="2023-12-31"/>
                      </div>
                      <div className="column">
                         <label htmlFor="returnTime">Return time:</label>

                        <input type="time" step="3600000" id="returnTime" name="appt"
                              min="07:00" max="21:00" required/>
                      </div>
                      <div className="column">
                        Location
                        <div id="location1">
                          <select name="location" id="location">
                              <option value="Nordhavn">Nordhavn</option>
                            <option value="Sydhavn">Sydhavn</option>
                            <option value="Amager">Amager</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
            </div>
          )}
          <div className="module" id="listmodule">
             <GridTable listOfBookings={listOfBookings}/> 
          </div>
        </div>
      </div>
  );
}

export default BookingOverview;
