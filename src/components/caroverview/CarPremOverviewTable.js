import { DataGrid} from "@mui/x-data-grid";
import SimpleModal from "../SimpleModal";
import { makeStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';

import "../SimpleModal.css"
import "./CarPremOverviewTable.css"





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
    minWidth:"510px"  
  },
});

/* Defines columns to be used in the grid, following MUI-Datagrid API */
const columns = [
  { field: "lotno",  headerName: "Lot no.", minWidth: 20, sortable:false, align: "center", headerAlign:"center" },
  { field: "group",  headerName: "Group", minWidth: 40, align: "center", headerAlign:"center" },
  { field: "make",  headerName: "Make", minWidth: 90, sortable:false },
  { field: "model",  headerName: "Model", minWidth: 30, align: "center", headerAlign:"center" },
  { field: "status",  headerName: "Status", minWidth: 30, sortable:false, flex: 0.3, align: "center", headerAlign:"center" },
  // Hidden columns are used to pass information to the simpleModal. Non-ideal workaround, but effective since it avoids an API call.
  { field: "id",  headerName: "Object ID", minWidth: 110, align: "center", headerAlign:"center", hide:true },
  { field: "fuelType",  headerName: "Fuel Type", minWidth: 110, align: "center", headerAlign:"center", hide:true },
  { field: "doorCount",  headerName: "Door Count", minWidth: 110, align: "center", headerAlign:"center", hide:true },
  { field: "color",  headerName: "Color", minWidth: 110, align: "center", headerAlign:"center", hide:true },
  { field: "licensePlate",  headerName: "License Plate", minWidth: 110, align: "center", headerAlign:"center", hide:true },


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


];

export default function CarPremOverviewTable(props) { 
    
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
          props.listOfCars.map((car) => (
            {
              group: car.group,
              make: car.make,
              model: car.model,
              lotno: car.parkingSpace,
              status: car.status,

              fuelType: car.fuelType,
              doorCount: car.doorCount,
              color: car.color,
              licensePlate: car.licensePlate,

              // Object ID necessary to link up with database
              id: car.objectID, 
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
