import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingOverview from './pages/BookingOverview.js';
import Management from './pages/Management.js';
import CarPrem from './pages/CarPrem.js';
import Sidebar from "./components/sidebar.js";
import NavBar from './components/navbar.js';

// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'cKg7NGmCgMOuIII928DKddKoWSFJS0AuyOMp0xvK';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'JsHCa94rsWevtgHq31U3jcELlk4XnlUrZFyfCnDK';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

//Returns contents of our app, including the navigation bar, side bar and the three pages.
export default function App() {
    return (
      <Router>
        <div>
        <NavBar/>
        <Sidebar/>
        <Routes>
            <Route exact path='/' element={<BookingOverview/>}></Route>
            <Route path='/management' element={<Management/>}></Route>
            <Route path='/carprem' element={<CarPrem/>}></Route>
        </Routes>
        </div>
      </Router>
    );
}

