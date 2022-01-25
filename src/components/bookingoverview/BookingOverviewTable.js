import React from "react";
import { DataGrid} from "@mui/x-data-grid";
import SimpleModal from "../SimpleModal";
import { makeStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteBooking} from "./BookingsAPI";

import "../SimpleModal.css"
import "./BookingOverviewTable.css"


function alertDelete(props) {
  if(window.confirm("Are you sure you want to delete this entry?\nThis cannot be undone") == true){
      deleteBooking(props)
  };
}



const useStyles = makeStyles({
  root: {
    "& .styledrows": {
      backgroundColor: "#EBEBEB",
    },
    border: "0px",
    outline: "none",
    marginTop: "1px",
    marginBottom: "1px",
    color: "red",
    margin:"0px",
    outline:"none",    
  },
});

/* Defines columns to be used in the grid, following MUI-Datagrid API */
const columns = [
  { field: "id",  headerName: "Booking ID", minWidth: 110, align: "center", headerAlign:"center" },
  { field: "name",  headerName: "Full Name", minWidth: 140, flex: 0.6,  },
  { field: "phoneNum",  headerName: "Phone", minWidth: 110, sortable:false },
  { field: "carGroup",  headerName: "Group", minWidth: 90, align: "center", headerAlign:"center" },
  { field: "pickup",  headerName: "Pick-up", minWidth: 100, sortable:false, flex: 0.3, align: "center", headerAlign:"center" },
  { field: "return",  headerName: "Return", minWidth: 100, sortable:false, flex: 0.3, align: "center", headerAlign:"center" },
  { field: "carStatus",  headerName: "Status", minWidth: 90, align: "left", headerAlign:"center" },
  { field: "licenseID",  headerName: "Driver's License", minWidth: 90, align: "left", headerAlign:"center", hide:true },
  { field: "address",  headerName: "Address", minWidth: 90, align: "left", headerAlign:"center", hide:true },

  // Hidden columns are used to pass information to the simpleModal. Non-ideal workaround, but effective since it avoids an API call.
  { field: "objectID",  headerName: "Object ID", minWidth: 110, align: "center", headerAlign:"center", hide:true },
  { field: "pickupDate",  hide:true },
  { field: "pickupTime",  hide:true },
  { field: "returnDate",  hide:true },
  { field: "returnTime",  hide:true },


  // Edit column represented by a button - adapted from https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid
  {
    field: "edit",
    headerName: "",
    sortable: false,
    align: "center",
    width: 20,
    renderCell: (params) => {

      // onClick function to fetch row information (bookingID)
      const onClick = () => {
        
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

          return thisRow
      };
     

      return <SimpleModal o={onClick()} isNew={false}/>
    }
  },

  // Delete column represented by a button - adapted from above link
  {
    field: "delete",
    headerName: "",
    sortable: false,
    align: "center",
    width: 20,
    renderCell: (params) => {

      // onClick function to fetch row information (bookingID)
      const onClick = () => {
        
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
          return thisRow.objectID
      };

      // HTML representation, deletebutton that executes alertDelete with return from onClick() as parameter
      return <button className="deleteButton" onClick={() => { alertDelete(onClick())}} ><DeleteIcon/></button>
    }
  },


];

export default function GridTable(props) { 
    
  const classes = useStyles({m:400});


  
  // Date formatting helpers, taken from W3Schools
  const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  return (
    <div className={classes.root} >
      <DataGrid
        autoHeight
        disableColumnMenu={true}
        scrollbarSize={100}
        disableColumnSelector={true}
        rowHeight={56}
        pageSize={10}
        showColumnRightBorder={true}
        disableSelectionOnClick
        columns={columns}
        sx={{useStyles}}
        rows={
          props.listOfBookings.map((booking) => (
            {
              id: booking.bookingID, 
              name: booking.fullName,
              phoneNum: booking.phoneNumber,
              carGroup: booking.carGroup,
              carStatus: booking.status,
              licenseID: booking.customerLicenseID,
              address: booking.address,
              // Date formatting
              pickup: addZero(booking.pickupDate.getDate())+"/"+months[booking.pickupDate.getMonth()]+"/"+booking.pickupDate.getFullYear()+"  "+booking.pickupDate.getHours() +":"+addZero(booking.pickupDate.getMinutes()),
              return: addZero(booking.dropOffDate.getDate())+"/"+months[booking.dropOffDate.getMonth()]+"/"+booking.dropOffDate.getFullYear()+"  "+booking.dropOffDate.getHours() +":"+addZero(booking.dropOffDate.getMinutes()),
              // Repeats necessary to pass information to modal
              pickupDate: booking.pickupDate.getFullYear()+"-"+months[booking.pickupDate.getMonth()]+"-"+addZero(booking.pickupDate.getDate()),
              pickupTime: booking.pickupDate.getHours() +":"+addZero(booking.pickupDate.getMinutes()),
              returnDate: booking.dropOffDate.getFullYear()+"-"+months[booking.dropOffDate.getMonth()]+"-"+addZero(booking.dropOffDate.getDate()),
              returnTime: booking.dropOffDate.getHours() +":"+addZero(booking.dropOffDate.getMinutes()),
              // Object ID necessary to link up with database
              objectID: booking.objectID, 
            }
          ))

      
      }
        headerHeight={50}
        getRowClassName={(params) => "styledrows"}

      />
      <div></div>
    </div>

  );
}
