import { useParams } from "react-router";
import "./TripDetails.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


function TripsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [disp, setdisp] = useState(false);
  const [selectedUser, setselectedUser] = useState(undefined);
  const [Users, setUsers] = useState();

  const state = useSelector((state) => {
    return {
      currentUser: state.usersReducer.currentUser,
      isLoggedIn: state.usersReducer.isLoggedIn,
      token: state.usersReducer.token,
    };
  });

  const config = {
    headers: {Authorization : `Bearer ${state.token}`},
  };

  useEffect(() => {
    getInfo();
    getUserNames();
  }, []);

  const getInfo = () => {
    axios
      .get(`http://localhost:8080/Trips/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserNames = () =>{
    axios
    .get("http://localhost:8080/Users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleUsername = (e) =>{
    setselectedUser(e.target.value);
  }

  const addUser = ()=>{
    console.log("currentUserId: ",state.currentUser.id)
    console.log("token: ",state.token)
      console.log(selectedUser);
      axios
      .put(`http://localhost:8080/Trips/${id}/users/${selectedUser}`,{},config)
      .then((res) => {
        console.log("Done");
        getInfo();
      })
      .catch((err) => {
        console.log(err);
      });


    }

  return (
    <div className="trip-page"> 
      {data !== undefined ? (
        <>
          <div className="div-heading">
            <p className="trip-heading">Traveler Information</p>
            <div style={{alignSelf: 'end',justifySelf: 'right'}}>
            {disp ? ( 
              <><button className="add-btn" onClick={()=>{addUser()}}>Add</button><select onClick={handleUsername} class="search-users" id="users">
                  <option value="" disabled selected>Select User </option>
                  {Users !== undefined ?
                    Users.map((e) => {
                      return (<option value={e.id}>{e.username}</option>);
                    }) : ""}
                </select></>) : ( "")}
            </div>
            {data.users[0].id == state.currentUser.id &&<button className="add-user pointer"
              onClick={() => {
                if (disp == false) {
                  setdisp(true);
                } else {
                  setdisp(false);
                }
              }}>
              +
            </button>}
          </div>

          <div className="first-div">
            <div className="users-list">
              {console.log(data.users[0])}
              {data !== undefined
                ? data.users.map((e) => {
                    return (
                      <div
                        className="comment-body"
                        onClick={() => {
                          navigate(`/Profile/${e.id}`);
                        }}
                      >
                        <img
                          src={e.image || "http://via.placeholder.com/60"}
                          className="re-pic pointer"
                          alt=""
                        />
                        <div class="contact_text">
                          <h4 className="pointer">{e.username}</h4>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          <p className="trip-heading b-b">Trip Details</p>
          <div className="card-block">
            <div className="row-grid">
              <div className="divs-info">
                <p>Owner Name:</p>
                <p className="text-muted">{data.users[0].username}</p>
              </div>
              <div className="divs-info">
                <p>Destination:</p>
                <p className="text-muted">
                  {data.places[0].city.name}, {data.places[0].city.country.name}
                </p>
              </div>
              <div className="divs-info">
                <p>Departure Date:</p>
                <p className="text-muted">{data.departure_date}</p>
              </div>
              <div className="divs-info">
                <p>Return Date:</p>
                <p className="text-muted">{data.return_date}</p>
              </div>
            </div>
          </div>

          <p className="trip-heading b-b">Activities Details</p>
          <div className="third-block">
            {data.places.map((e) => {
              return (
                <div
                  className="sup pointer"
                  onClick={() => {
                    navigate(`/PlaceDetails/${e.id}`);
                  }}
                >
                  <img
                    src={e.image || "http://via.placeholder.com/100"}
                    alt="place"
                  />
                  <div className="scd">
                    <h5 className="third-color">{e.name}</h5>
                    <div>
                      <p>{e.location}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default TripsDetails;
