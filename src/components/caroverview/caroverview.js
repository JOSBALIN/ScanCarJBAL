import "./CarOverviewGrid.css";
import "../CarPrem.css";
import ParkingLotSpot from "./ParkingLotSpots.js";
import * as React from 'react';


// Defining parking spots
const parkingSpots = new Array(42);

for (let i = 1; i <= 42; i++) {
  let lotName = "";
  if(i <= 14 ){ lotName = "a"+i}
  if(i > 14 && i <= 28 ){ lotName = "b"+(i-14)} 
  if(i > 28 ){ lotName = "c"+(i-28)} 
  parkingSpots[i] = {
    id:lotName,
    status:"",
    licenseplate:"",
    make:"",
    model:"",
    color:"",
    doorCount:"",
    fuelType:"",
    }
} 






export default function LotOverview(props) {

  const listOfCars = props.listOfCars
  const [loading,setLoading]= React.useState()

  


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
          parkingSpots[j].make = currentCar.make;
          parkingSpots[j].model = currentCar.model;
          parkingSpots[j].color = currentCar.color;
          parkingSpots[j].doorCount = currentCar.doorCount;
          parkingSpots[j].fuelType = currentCar.fuelType;
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
      <ParkingLotSpot
        id={currentSpot.id}
        className={className}
        make={currentSpot.make}
        model={currentSpot.model}
        color={currentSpot.color}
        doorCount={currentSpot.doorCount}
        fuelType={currentSpot.fuelType}
      />
    );
  }
  return aSpots
}



  const bSpots = []
  function drawB(props){
    for(let i = 1; i <= 14; i++){
      let currentSpot = props[i+14]
      let className = "small-grid-box " + currentSpot.status
      bSpots.push(
        <ParkingLotSpot
        id={currentSpot.id}
        className={className}
        make={currentSpot.make}
        model={currentSpot.model}
        color={currentSpot.color}
        doorCount={currentSpot.doorCount}
        fuelType={currentSpot.fuelType}
      />
      )
    }
  return bSpots
  }

  const cSpots = []
function drawC(props){
for(let i = 1; i <= 14; i++){
  let currentSpot = props[i+28]
  let className = "small-grid-box " + currentSpot.status
  cSpots.push(
    <ParkingLotSpot
        id={currentSpot.id}
        className={className}
        make={currentSpot.make}
        model={currentSpot.model}
        color={currentSpot.color}
        doorCount={currentSpot.doorCount}
        fuelType={currentSpot.fuelType}
      />
  )
}
return cSpots
}



//   setTimeout(() => {
//     setLoading("aa")
//     console.log("asdasdsa")
//     setLoading("bb")
// }, 5000);

  return (
    <div className="grid-container">
      <div className="grid-item grid-item-1">
      <div className="small-grid-box-container-horizontal">
        {
        drawC(check())
        }
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
