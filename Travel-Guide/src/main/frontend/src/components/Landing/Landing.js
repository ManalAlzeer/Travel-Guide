import Header from "../Navbar/Header";
import roma from "../../images/rome-italy.jpg";
import paris from "../../images/paris-f.jpg";
import dubai from "../../images/dubai-u.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Landing.css"

function Landing() {
    const state = useSelector((state) => {
        return {
          currentUser: state.usersReducer.currentUser,
          UserType: state.usersReducer.UserType,
          token: state.usersReducer.token,

        };
      });
  const navigate = useNavigate();
  return (
    <>
      {console.log("CurrntUser: ",state.currentUser)}
      {console.log("State: ",state.UserType)}
      {console.log("Token is: ", state.token)}
      <Header />

      <div className="Landing">
        <div className="gaid">
          <div className="gaidCard" style={{ background: "#A8A8A8" }}>
            <h1>01</h1>
            <h2>Join Us</h2>
            <p>To find more features, don't forget Create Account..</p>
            <Link to="/SignUp" className="link">
              <span className="icon">
                <i className="fas fa-chevron-circle-right"></i>
              </span>
            </Link>
          </div>
          <div className="gaidCard" style={{ background: "#2D2422" }}>
            <h1>02</h1>
            <h2>Search</h2>
            <p>
              To assist you in discovering the most visited countries and
              cities..
            </p>
            <Link to="/Search" className="link">
              <span className="icon">
                <i className="fas fa-chevron-circle-right"></i>
              </span>
            </Link>
          </div>
          <div className="gaidCard" style={{ background: "#9B1E1E" }}>
            <h1>03</h1>
            <h2>Choose Places</h2>
            <p>Find the most exciting places in these cities..</p>
            <Link to="/Search" className="link">
              <span className="icon">
                <i className="fas fa-chevron-circle-right"></i>
              </span>
            </Link>
          </div>
          <div className="gaidCard" style={{ background: "#D3A65A" }}>
            <h1>04</h1>
            <h2>Find Mates</h2>
            <p>Choose your trip and get to know your teammates...</p>
            <Link to="/Trips" className="link">
              <span className="icon">
                <i className="fas fa-chevron-circle-right"></i>
              </span>
            </Link>
          </div>
        </div>

        <div className="cties-group">
        <p>Plan your trip</p>
          <div className="titles">
            <h2 className="coloring">
            Where to next?
            </h2>
            <button className="btn pointer" onClick={()=>{navigate("/Search");}}>Show More</button>
          </div>

          <div className="container-group">
            <div className="pic" onClick={() => { navigate(`/CityDetails/8`);}}>
              <img className="img-effict" src={roma} alt="profile_picture" />
              <h2>Roma <i className="fas fa-chevron-circle-right"></i></h2>
            </div>
            <div className="pic" onClick={() => { navigate(`/CityDetails/6`);}}>
              <img className="img-effict" src={paris} alt="profile_picture" />
              <h2>Paris <i className="fas fa-chevron-circle-right"></i></h2>
            </div>
            <div className="pic" onClick={() => { navigate(`/CityDetails/4`);}}>
              <img className="img-effict" src={dubai} alt="profile_picture" />
              <h2>Dubai <i className="fas fa-chevron-circle-right"></i></h2>
            </div>
          </div>

          </div>
      </div>
    </>
  );
}

export default Landing;
