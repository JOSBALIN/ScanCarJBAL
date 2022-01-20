import "./caroverviewgrid.css";
import "../CarPrem.css";
import ParkingLotSpot from "./parkingLotSpot.js";
import { getAllCars } from './carComponent';
import * as React from 'react';


// Defining parking spots
let parkingSpots = new Array(42);

for (let i = 1; i <= 42; i++) {
  let lotName = "";
  if(i <= 14 ){ lotName = "a"+i}
  if(i > 14 && i <= 28 ){ lotName = "b"+(i-14)} 
  if(i > 28 ){ lotName = "c"+(i-28)} 
  parkingSpots[i] = {
    id:lotName,
    status:"",
    licenseplate:"",
  }
} 




export default function LotOverview() {

  const [listOfCars, setListOfCars] = React.useState([]); 
    

  React.useEffect(async() => { 
    const listOfCars = await getAllCars();
    console.log(listOfCars);
    setListOfCars(listOfCars); 
  }, [])

  function check(){
    for (let i = 0; i < listOfCars.length; i++) {
      let currentCar = listOfCars[i];
      // Iterate over parking spaces
      for (let j = 1; j < parkingSpots.length; j++) {
        // check for match between car location and parking space
        if (currentCar.parkingSpace.localeCompare(parkingSpots[j].id) == 0) {
          // update parking spot with information to match car
          parkingSpots[j].status = currentCar.status;
          parkingSpots[j].licenseplate = currentCar.licensePlate;
        }
      }
    }
    console.log(parkingSpots)
    console.log(listOfCars)
    return parkingSpots
  }



const aSpots = []
function drawA(props){
  for(let i = 1; i <= 14; i++){
    let currentSpot = props[i]
    let className = "small-grid-box " + currentSpot.status
    aSpots.push(
      <ParkingLotSpot id={currentSpot.id} className={className}/>
    )
  }
  return aSpots
}

  const bSpots = []
  function drawB(props){
    for(let i = 1; i <= 14; i++){
      let currentSpot = props[i+14]
      let className = "small-grid-box " + currentSpot.status
      bSpots.push(
        <ParkingLotSpot id={currentSpot.id} className={className}/>
      )
    }
  return bSpots
  }

  const cSpots = []
  function drawC(props){
  for(let i = 1; i <= 14; i++){
    let currentSpot = parkingSpots[i+28]
    let className = "small-grid-box " + currentSpot.status
    cSpots.push(
      <ParkingLotSpot id={currentSpot.id} className={className}/>
    )
  }
  return cSpots
}

  

  return (
    <div className="grid-container">
      <div className="grid-item grid-item-1">
      <div className="small-grid-box-container-horizontal">
        {drawC(check())}
      </div>
      </div>
      <div className="grid-item grid-item-2">
      <div className="small-grid-box-container-vertical">
        {drawA(check())}
        </div>
      </div>
      <div className="grid-item grid-item-3">
      <div className="small-grid-box-container-vertical">
        {drawB(check())}
        </div>
      </div>
    </div>
  );
}
