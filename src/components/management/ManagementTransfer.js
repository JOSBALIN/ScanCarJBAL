import * as React from "react";
import "./ManagementModules.css";
import "./ManagementTransfer.css";
import DatePicker from "../datepicker/DatePicker";
import CounterButton from "./CounterButton";



/**
 * @param props.type: type of transfer (request/release), used for titling
 * @returns display of transfer module 
 */
export default function CarTransfer(props) {
  return (
    <div className="module" id="mtransfermodule">
      <div className="moduletitle" id="mtransfermodule">
        <h3>{props.type}</h3>
      </div>
      <div className="counterbuttonAndCalendarDiv">
        <div className="counterbuttonDiv">
          <CounterButton label={"A"} />
          <CounterButton label={"B"} />
          <CounterButton label={"C"} />
          <CounterButton label={"D"} />
          <CounterButton label={"E"} />
          <CounterButton label={"F"} />
        </div>
        <div className="calendarDiv">
          <DatePicker />
        </div>
      </div>
      <div><button className="bottomButton">{props.type}</button></div>
    </div>
  );
}
