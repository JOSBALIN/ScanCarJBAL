import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';



const ReadBookings = async function () {
    const [readResults, setReadResults] = useState()
    // Reading parse objects is done by using Parse.Query
    const parseQuery = new Parse.Query('Booking');
    try {
      let bookings = await parseQuery.find();
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      setReadResults(bookings);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      window.alert('Error!', error.message);
      return false;
    };
  };


  /* getAll* api calls are read operations, retrieving all objects of a given class.  
*/
/**
 * @param 
 * @returns list of all cars mapped
 * @abstract read function for retrieving all existing objects of the car class
 */
 export async function getAllBookings() {
  try {
  // Creating new query for the car class, include pointer keys to retrieve associated information
  let query = new Parse.Query("Booking");

  let queryResult = await query.find();
  
  // Run the query to retrieve all objects on Cars class, with their respective attributes
  console.log(queryResult);
  // Mapping all cols + rows
  const bookingList = queryResult.map((booking) => {return {

    objectId: booking.get("objectId"),
    bookingID: booking.get("bookingID"),
    fullName: booking.get("fullName"),
    status : booking.get("status"),
    carGroup: booking.get("carGroup"),
    phoneNumber: booking.get("phoneNumber"),
    address: booking.get("address"),
    customerLicenseID: booking.get("customerLicenseID"),
    carLicensePlate: booking.get("carLicensePlate"),
    dropOffLocation: booking.get("dropOffLocation"),
    dropOffDate: booking.get("dropOffDate"),
    pickupLocation: booking.get("pickupLocation"),
    pickupDate: booking.get("pickupDate"),


}})
  
  console.log(bookingList[0]);
  return bookingList;
  } catch (error) {
      console.log("Error retrieving cars" + error);   
  }
}

export async function deleteBooking(bookingID) {
    const query = new Parse.Query('Booking');
    // find Booking by its ID
    query.equalTo('bookingID', bookingID);
    // Running query
    const Booking = await query.first();
    // .destroy to delete object
    try {
      await Booking.destroy();
      window.alert('Success!', 'Booking deleted!');
      // read method to update list. Not implemented yet.
      //   readBookings();
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      window.alert('Error!', error.message);
      return false;
    };
  };

  export async function createBooking(props) {
    // This value comes from a state variable
    const newBookingName = props.fullName;
    const newBookingPickupDate = props.PickupDate
    // Creates a new Booking parse object instance
    let Booking = new Parse.Object("Booking");
    Booking.set("fullName", props.fullName);
    Booking.set("status", props.status);
    Booking.set("carGroup", props.carGroup);
    Booking.set("phoneNumber", props.phoneNumber);
    Booking.set("address", props.address);
    Booking.set("customerLicenseID", props.customerLicenseID);
    Booking.set("carLicensePlate", props.carLicensePlate);
    Booking.set("dropOffLocation", props.dropOffLocation);
    // add the next ones also

    Booking.set("done", false);
    // After setting the todo values, save it on the server
    try {
        await Booking.save();
        // Success
        window.alert('Success!', 'Todo created!');
        // Refresh todos list to show the new one (you will create this function later)
        return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      window.alert("Error!", error.message);
      return false;
    }
  };



export const BookingComponent = () => {
  // State variables
  const [booking, setBooking] = useState(null);

  async function fetchBooking() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Booking');
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo('fullName', 'Jonathan Larson');
    // run the query
    const Booking = await query.first();
    // access the Parse Object attributes
    console.log('person name: ', Booking.get('fullName'));
    console.log('person id: ', Booking.id);
    setBooking(Booking);
  }



  return (
    <div>
      <button onClick={fetchBooking}>Add Car</button>
      <button onClick={getAllBookings}>Fetch All Cars</button>
      {booking !== null && (
        <div>
          <p>{`Name: ${booking.get('fullName')}`}</p>
          <p>{`Email: ${booking.get('carGroup')}`}</p>
        </div>
      )}
    </div>
  );
};