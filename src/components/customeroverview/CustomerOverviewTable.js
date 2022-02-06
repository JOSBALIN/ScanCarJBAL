import React from "react";
import { DataGrid} from "@mui/x-data-grid";
import CustomerModal from "./CustomerModal";
import { makeStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from "./CustomersAPI";

import "./CustomerModal.css"
import "./CustomerOverviewTable.css"


function alertDelete(props) {
  if(window.confirm("Are you sure you want to delete this entry?\nThis cannot be undone") == true){
      deleteCustomer(props)
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
  { field: "id",  headerName: "License ID", minWidth: 110, align: "center", headerAlign:"center" },
  { field: "name",  headerName: "Full Name", minWidth: 140, flex: 0.6,  },
  { field: "phoneNum",  headerName: "Phone", minWidth: 110, sortable:false },
  { field: "address",  headerName: "Address", minWidth: 90, align: "left", headerAlign:"center", hide:false },

  // Hidden columns are used to pass information to the simpleModal. Non-ideal workaround, but effective since it avoids an API call.
  { field: "objectID",  headerName: "Object ID", minWidth: 110, align: "center", headerAlign:"center", hide:true },


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
     

      return <CustomerModal o={onClick()} isNew={false}/>
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

export default function GridTable() { 
  const [listOfCustomers, setListOfCustomers] = React.useState([]);
    
    React.useEffect(async() => { 
      const allCustomers = await getAllCustomers();
      setListOfCustomers(allCustomers);
    }, [])

  const emptyRecord = {
  };
    
  const classes = useStyles({m:400});


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
          listOfCustomers.map((customer) => (
            {
              id: customer.licenseID, 
              name: customer.name,
              phoneNum: customer.phoneNum,
              address: customer.address,
              // Object ID necessary to link up with database
              objectID: customer.objectID, 
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
