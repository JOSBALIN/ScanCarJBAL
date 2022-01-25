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
  console.log(queryResult);
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
  
  console.log("Cars retrieved" + carList);
  return carList;
  } catch (error) {
      console.log("Error retrieving cars" + error);   
  }
}

export async function addCar(props) {
  try {
    // create a new Parse Object instance
    const Car = new Parse.Object('Car');
    // define the attributes you want for your Object
    Car.set('licensePlate', props.licensePlate);
    Car.set('group', props.group);
    // Car.set('make', props.make);
    // Car.set('Status', props.status);
    // Car.set('model', props.model);
    // Car.set('color', props.color);
    // save it on Back4App Data Store
    await Car.save();
    alert('Car saved!');
  } catch (error) {
    console.log('Error saving new car: ', error);
  }
}

export const CarComponent = () => {
  // State variables
  const [car, setCar] = useState(null);


  async function fetchCar() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Car');
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo('licensePlate', '0010pcx');
    // run the query
    const Car = await query.first();
    // access the Parse Object attributes
    console.log('person name: ', Car.get('name'));
    console.log('person email: ', Car.get('email'));
    console.log('person id: ', Car.id);
    setCar(Car);
  }

  


  return (
    <div>
      <button onClick={addCar}>Add Car</button>
      <button onClick={fetchCar}>Fetch Car</button>
      <button onClick={getAllCars}>Fetch All Cars</button>
      {car !== null && (
        <div>
          <p>{`Name: ${car.get('licensePlate')}`}</p>
          <p>{`Email: ${car.get('group')}`}</p>
        </div>
      )}
    </div>
  );
};