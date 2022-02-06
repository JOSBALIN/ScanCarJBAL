import React, { Component } from "react";
import { Popup } from 'semantic-ui-react'
import CarModal from "./EditCarModal";

const popupStyle = {
  borderRadius: 6,
  backgroundColor:"white",
  border:"solid",
  padding: '0.2em',
  borderWidth:"2px",
  width:"160px",
}
function renderThing(props){
  if(props.className.length < 16){
    return(
      <div className={props.className} id={props.id}>
      <h3>{props.id}</h3>
      </div>
    )
  } else {
    return (
      <Popup
        header={props.make + " " + props.model}
        size="huge"
        style={popupStyle}
        content={
          "Color: " +
          props.color +
          " " +
          "Doors: " +
          props.doorCount +
          " Fuel type: " +
          props.fuelType
        }
        trigger={
          <div
            className={props.className}
            id={props.id}
          >
            <h3>{props.id}</h3>
          </div>
        }
      />
    );
  }
}


/**
 * @params props.label, the label for the button (CarGroup)
 */
class ParkingLotSpot extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.className = props.className;
    this.make = props.make;
    this.model = props.model;
    this.color = props.color;
    this.doorCount = props.doorCount;
    this.fuelType = props.fuelType;
  }




  /**
   * Renders parking lot spot with pop-up on hover
   */
  render() {
    return ( 
      <div>
      {renderThing(this)}

      </div>
    );
  }
}

export default ParkingLotSpot;
