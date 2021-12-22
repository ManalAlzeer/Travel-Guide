import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Search from "./components/Seacrch/Search";
import Navbar from "./components/Navbar/Navbar";
import Places from "./components/Places/Places";
import PlaceDetails from "./components/PlacesDetails/PlaceDetails";
import CityDetails from "./components/CityDetails/CityDetails";
import AdminPage from "./components/Admin/AdminPage";
import ScrollToTop from "./components/ScrollToTop";
import Trips from "./components/Trips/Trips";
import TripsDetails from "./components/TripDetails/TripDetails";

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/PlaceDetails/:id" element={<PlaceDetails />} />
        <Route path="/CityDetails/:id" element={<CityDetails />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Places" element={<Places/>}/>
        <Route path="/AdminPage/:id" element={<AdminPage/>}/>
        <Route path="/Trips" element={<Trips/>}/>
        <Route path="/TripsDetails/:id" element={<TripsDetails/>}/>
      </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
