import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

  /* getAll* api calls are read operations, retrieving all objects of a given class.  
*/
/**
 * @param 
 * @returns list of all cars mapped
 * @abstract read function for retrieving all existing objects of the car class
 */
 export async function getAllCars() {
  try {
  // Creating new query for the car class, include pointer keys to retrieve associated information
  let query = new Parse.Query("Car");

  let queryResult = await query.find();
  
  // Run the query to retrieve all objects on Cars class, with their respective attributes
  // Mapping all cols + rows
  const carList = queryResult.map((car) => {return {
    objectID: car.id,
    group: car.get("group"),
    status : car.get("Status"),
    parkingSpace: car.get("parkingSpace"),
    licensePlate: car.get("licensePlate"),
    make: car.get("make"),
    model: car.get("model"),
    color: car.get("color"),
    doorCount: car.get("doorCount"),
    fuelType: car.get("fuelType")


}})
  
  return carList;
  } catch (error) {
      console.log("Error retrieving cars" + error);   
  }
}

export async function createCar(props) {
  try {
    if (checkParkingSpot(props.parkingSpace)) {
      // create a new Parse Object instance
      const Car = new Parse.Object("Car");
      // define the attributes you want for your Object
      Car.set("licensePlate", props.licensePlate);
      Car.set("group", props.group);
      Car.set("make", props.make);
      // Car.set('Status', props.status);
      Car.set("model", props.model);
      Car.set("color", props.color);
      Car.set("parkingSpace", props.parkingSpace);
      // save it on Back4App Data Store
      await Car.save();
      alert("Car saved!");
    }
  } catch (error) {
    console.log("Error saving new car: ", error);
  }
}



export async function checkParkingSpot(props) {
  const query = new Parse.Query('Car');
  // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
  query.equalTo('parkingSpace', props.toLowerCase());
  // run the query
  const Car = await query.first();
  console.log(props)
  console.log(Car)
  if(Car == null){
    return false
  } else {
    return true
  }

}