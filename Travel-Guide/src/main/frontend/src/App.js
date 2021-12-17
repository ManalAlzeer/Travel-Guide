import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Cities from "./components/Cities";
import Places from "./components/Places";
import PlaceDetails from "./components/PlaceDetails";
import CityDetails from "./components/CityDetails";
import AdminPage from "./components/AdminPage";

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/PlaceDetails/:id" element={<PlaceDetails />} />
        <Route path="/CityDetails/:id" element={<CityDetails />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Cities" element={<Cities/>}/>
        <Route path="/Places" element={<Places/>}/>
        <Route path="/AdminPage" element={<AdminPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
