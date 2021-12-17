// import { useState } from "react";
import imgprofile from "../images/profile-picture.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/Login/action";
import { useDispatch } from "react-redux";


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      currentUser: state.usersReducer.currentUser,
      UserType: state.usersReducer.UserType,
      isLoggedIn: state.usersReducer.isLoggedIn,
    };
  });

  return (
    <>
      {console.log(state.currentUser)}
      {console.log("State: ")}
      {console.log(state.UserType)}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      />
      <div className="header">

        <div className="sidebar">
          {state.isLoggedIn && (<div className="profile">
            <img src={imgprofile} alt="profile_picture" />
              <h3>{state.currentUser.username}</h3>
              <p>{state.UserType}</p>
          </div>)}
          {!state.isLoggedIn && (<ul className="Unlogin" >
            <li>
              <Link to="/" className="link">
                <span className="icon">
                  <i className="fa fa-home"></i>
                </span>
                <span className="item">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/Search" className="link">
                <span className="icon">
                  <i className="fa fa-search"></i>
                </span>
                <span className="item">Search</span>
              </Link>
            </li>
            <li>
            <Link to="/SignUp" className="link">
                <span className="icon">
                  <i className="fa fa-sign-in-alt"></i>
                </span>
                <span className="item">Join Us</span>
              </Link>
            </li>
          </ul>)}
          {state.isLoggedIn && (<ul>
            <li>
              <Link to="/" className="link">
                <span className="icon">
                  <i className="fa fa-home"></i>
                </span>
                <span className="item">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/Search" className="link">
                <span className="icon">
                  <i className="fa fa-search"></i>
                </span>
                <span className="item">Search</span>
              </Link>
            </li>
            <li onClick={()=>{navigate(`/Profile/${state.currentUser.id}`);}}>
              <Link to="" className="link">
                <span className="icon">
                  <i className="fa fa-address-card"></i>
                </span>
                <span className="item">Your Profile</span>
              </Link>
            </li>
            {state.UserType === "Admin" && (<li>
              <Link to="/AdminPage" className="link">
                <span className="icon">
                  <i className="fa fa-user"></i>
                </span>
                <span className="item">Admin Page</span>
              </Link>
            </li>)}
          </ul>)}

          {state.isLoggedIn && (<Link to="/" className="link">
            <span className="icon">
              <i className="fas fa-sign-out-alt fa-flip-horizontal"></i>
            </span>
            <span className="item" onClick={() => {
                const action = logout();
                dispatch(action);
              }}>Log Out</span>
          </Link>)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
