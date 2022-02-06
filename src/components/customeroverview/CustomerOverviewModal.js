import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { createCustomer, deleteCustomer, updateCustomer } from "./CustomersAPI";
import GridTable from "./CustomerOverviewTable";
import CustomerModal from "./CustomerModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
}));

export default function CustomerOverviewModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const emptyRecord = {};

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function ModalButton() {
    return (
      <Button id="newBooking" onClick={handleOpen}>
        See all customers
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
            <h3>Customer Overview</h3>
          </div>
          <div className="module">
            <GridTable/>
          </div>
          <div id="buttonDiv">
            <CustomerModal
              o={emptyRecord}
              isNew={true}
              className="modalButton"
            />

            <button
              className="modalButton"
              id="cancelButton"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
