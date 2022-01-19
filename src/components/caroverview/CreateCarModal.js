import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./CreateCarModal.css";
import EditIcon from "@mui/icons-material/Edit";
import { addCar } from "../../carComponent";


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


export default function CreateCarModal(props) {


  const pass = {group: "A", licensePlate: "102030"}
  const classes = useStyles();
  const [open, setOpen] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function ModalButton() {
      return (
        <Button id="editButton" onClick={handleOpen}>
          <EditIcon />
        </Button>
      );
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
            <div className="row" id="customerInformationTop">
              {" "}
              <div className="column">
                <h4>Car information</h4>
              </div>
              <div className="column" id="cartype">
              </div>
            </div>
            <div>
              <form className="row" id="bookinginformation">
                <p>
                  <label>Name</label>
                  <input type="text" name="Name"/>
                </p>
                <p>
                      <label>Group</label>
                      <select name="location" id="location">
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
                  <input type="text" name="make"/>
                </p>
                <p>
                  <label>Model</label>
                  <input type="text" name="model"/>
                </p>
                <p>
                  <label>Color</label>
                  <input type="text" name="color"/>
                </p>
                <p>
                  <label>License plate</label>
                  <input type="text" name="License ID"/>
                </p>
              </form>
            </div>
          </div>

          <div id="buttonDiv">
            <button className = "modalButton" id="cancelButton" onClick={handleClose}>Cancel</button>
            <button className = "modalButton" id="confirmButton" onClick={() => { addCar(pass) }}
            >
            Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
