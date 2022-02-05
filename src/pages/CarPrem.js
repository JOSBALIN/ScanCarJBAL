import * as React from 'react';
import "../components/CarPrem.css"
import CarPremOverviewTable from '../components/caroverview/CarPremOverviewTable';
import LotOverview from "../components/caroverview/CarOverview";
import CarModal from "../components/caroverview/CreateCarModal";
import { getAllCars } from '../components/caroverview/CarsAPI';

function Home() {
    const [listOfCars, setListOfCars] = React.useState([]); 
    const [loading, setLoading] = React.useState("aa"); 
    

    React.useEffect(async() => { 
      const allCars = await getAllCars();
      console.log(allCars);
      setListOfCars(allCars); 
    }, [])

    setTimeout(() => {
      setLoading("bb")
      console.log("bb")
      }, 700)

    function parkingSpaces() {
      if (loading.localeCompare("aa")) {
        return (
          <LotOverview listOfCars={listOfCars}/>
        );
      } else {
        return (
          <div id='parkingmodule'></div>
        );
      }
    }


    return (
      <div className="Background">
        <div>
          <div className="canvas">
            <div className="moduletitle" id="carprem">
              <h2>Cars on Premises</h2>
            </div>
            <div className="row">
              <div className="column">
                <div className="module" id="overview">
                  <div className="moduletitle">
                  <h2>Overview</h2>
                  </div>
                  <CarPremOverviewTable listOfCars={listOfCars} />
                  <div id="createCar">
                  <CarModal isNew={true}/>
                  </div>
                </div>
              </div>
              <div className="columns">
                {parkingSpaces()}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
