import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./CarModal.css";
import { createCar } from "./CarsAPI";
import EditIcon from "@mui/icons-material/Edit";
import ParkingLotSpot from "./ParkingLotSpots";


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


export default function CarModal(props) {


  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const isNew = props.isNew;

  const group = React.createRef(); 
  const make = React.createRef();   
  const model = React.createRef();
  const color = React.createRef();
  const licensePlate = React.createRef()
  const doorCount = React.createRef();
  const location = React.createRef();
  const parkingSpace = React.createRef();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    const prop = {
      group: group.current.value, 
      make: make.current.value, 
      model: model.current.value,
      color: color.current.value,
      licensePlate: licensePlate.current.value,
      doorCount: doorCount.current.value,
      location: location.current.value,
      parkingSpace: parkingSpace.current.value.toLowerCase(),
    };
    // 
    createCar(prop)
      handleClose();
    
  };


  function ModalButton() {
    if (isNew) {
      return (
        <Button id="newBooking" className="createModal" onClick={handleOpen}>
          + New Car
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
            <h3>Create Car</h3>
          </div>
          <div className="module">
            <div className="row" id="carinformationheader">
              {" "}
              <div className="column">
                <h4>Car information</h4>
              </div>
              <div className="column" id="cartype">
              </div>
            </div>
            <div>
              <form className="row" id="carinformation">
                <p>
                      <label>Group</label>
                      <select name="group" id="group" ref={group}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </select>
                    </p>
                <p>
                  <label>Make</label>
                  <input type="text" name="Make" ref={make}/>
                </p>
                <p>
                  <label>Model</label>
                  <input type="text" name="Model" ref={model}/>
                </p>
                <p>
                  <label>Color</label>
                  <input type="text" name="Color" ref={color}/>
                </p>
                <p>
                  <label>License plate</label>
                  <input type="text" name="License Plate" ref={licensePlate}/>
                </p>
                <p>
                  <label>Door Count</label>
                  <input type="number" name="Door Count" ref={doorCount}/>
                </p>
                <p>
                    <label>Location</label>
                    <select
                      name="location"
                      id="location"
                      ref={location}
                    >
                      <option value="Nordhavn">Nordhavn</option>
                      <option value="Sydhavn">Sydhavn</option>
                      <option value="Amager">Amager</option>
                    </select>
                  </p>
                <p>
                  <label>Parking Space</label>
                  <input type="text" name="Parking Space" ref={parkingSpace}/>
                </p>
              </form>
            </div>
          </div>

          <div id="buttonDiv">
            <button className = "modalButton" id="cancelButton" onClick={handleClose}>Cancel</button>
            <button className = "modalButton" id="confirmButton" onClick={() => { handleCreate() }}
            >
            Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
