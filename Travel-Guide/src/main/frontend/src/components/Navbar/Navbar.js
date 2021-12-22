// import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/Login/action";
import { useDispatch } from "react-redux";
import "./Navbar.css"


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
      <div className="logo">
            <a href="" onClick={()=>{navigate("/");}}><span className="coloring">TRAVEL </span> Website</a>
      </div>
      <nav className="navMenu">
      <Link to="/" className="link">
        <span className="icon"><i className="fa fa-home"></i></span>
      </Link>
      <Link to="/Search" className="link">
        <span className="icon"><i className="fa fa-search"></i></span>
      </Link>
      {!state.isLoggedIn && (<Link to="/SignUp" className="link">
                <span className="icon">
                  <i className="fa fa-sign-in-alt"></i>
                </span>
      </Link>)}
      {state.isLoggedIn && (<i onClick={()=>{navigate(`/Profile/${state.currentUser.id}`);}}><Link to="" className="link">
                <span className="icon">
                  <i className="fa fa-address-card"></i>
                </span>
      </Link></i>)}
      {state.UserType === "Admin" && (<i onClick={()=>{navigate(`/AdminPage/${state.currentUser.id}`);}}><Link to="/AdminPage" className="link">
                <span className="icon">
                  <i className="fa fa-user"></i>
                </span>
              </Link></i>)}
      {state.isLoggedIn && (<Link to="/" onClick={() => {
                const action = logout();
                dispatch(action);
              }} className="link">
            <span className="icon">
              <i className="fas fa-sign-out-alt fa-flip-horizontal"></i>
            </span>
          </Link>)}
      </nav>

      </div>
    </>
  );
}

export default Navbar;
