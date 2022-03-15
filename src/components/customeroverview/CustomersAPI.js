import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";

/* getAll* api calls are read operations, retrieving all objects of a given class.
 */
/**
 * @param
 * @returns list of all cars mapped
 * @abstract read function for retrieving all existing objects of the car class
 */
export async function getAllCustomers() {
  try {
    // Creating new query for the car class, include pointer keys to retrieve associated information
    let query = new Parse.Query("Customer");

    let queryResult = await query.find();

    // Run the query to retrieve all objects on Bookings class, with their respective attributes
    const customerList = queryResult.map((customer) => {
      return {
        objectID: customer.id,
        name: customer.get("name"),
        phoneNum: customer.get("phoneNum"),
        address: customer.get("address"),
        licenseID: customer.get("licenseID"),
      };
    });

    return customerList;
  } catch (error) {
    console.log("Error retrieving customers" + error);
  }
}

export async function deleteCustomer(objectId) {
  const query = new Parse.Query("Customer");
  // find Customer by its ID
  query.equalTo("objectId", objectId);
  // Running query
  const Customer = await query.first();
  // .destroy to delete object
  try {
    await Customer.destroy();
    window.alert("Success!", "Customer deleted!");
    window.location.reload();
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    window.alert("Error!", error.message);
    return false;
  }
}

export async function updateCustomer(props) {
  // Create a new todo parse object instance and set todo id
  let Customer = new Parse.Object("Customer");
  Customer.set("objectId", props.objectID);
  // Setters
  Customer.set("name", props.name);
  Customer.set("phoneNumber", props.phoneNumber);
  Customer.set("address", props.address);
  Customer.set("licenseID", props.licenseID);
  try {
    await Customer.save();
    // Success
    window.alert("Success!", "Customer updated!");
    window.location.reload();
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    window.alert("Error!", error.message);
    return false;
  }
}

export async function createCustomer(props) {
  // Creates a new Booking parse object instance
  let Customer = new Parse.Object("Customer");

  // Setters
  Customer.set("name", props.name);
  Customer.set("phoneNum", props.phoneNum);
  Customer.set("address", props.address);
  Customer.set("licenseID", props.licenseID);

  // After setting the booking values, save it on the server
  try {
    await Customer.save();
    // Success
    window.alert("Success!", "Customer created!");
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    window.alert("Error!", error.message);
    return false;
  }
}

export const BookingComponent = () => {
  // State variables
  const [booking, setBooking] = useState(null);

  async function fetchBooking() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("Booking");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("fullName", "Jonathan Larson");
    // run the query
    const Booking = await query.first();
    // access the Parse Object attributes
    setBooking(Booking);
  }

  return (
    <div>
      <button onClick={fetchBooking}>Add Car</button>
      <button onClick={getAllCustomers}>Fetch All Cars</button>
      {booking !== null && (
        <div>
          <p>{`Name: ${booking.get("fullName")}`}</p>
          <p>{`Email: ${booking.get("carGroup")}`}</p>
        </div>
      )}
    </div>
  );
};
