import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { storage } from "../firebase/firebase";
import { useSelector } from "react-redux";
import "./Profile.css";

function Profile() {
  const state = useSelector((state) => {
    return {
      currentUser: state.usersReducer.currentUser,
      isLoggedIn: state.usersReducer.isLoggedIn,
      token: state.usersReducer.token,
    };
  });

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [type, setType] = useState("Traveler");
  const [cities, setCities] = useState();
  const [Places, setPlaces] = useState();
  const { id } = useParams();
  const [selectedCity, setselectedCity] = useState(undefined);
  const [selectedPlaces, setselectedPlaces] = useState("");
  const [departure, setdeparture] = useState();
  const [returnDate, setreturnDate] = useState();
  const [PicInfo, setPicInfo] = useState("");

  const handleSelectedCity = (e) => {
    setselectedCity(e.target.value);
    console.log("City: ", e.target.value);

    axios
      .get(`http://localhost:8080/Cities/${e.target.value}`)
      .then((res) => {
        setPlaces(res.data.places);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleselectedPlaces = (e) => {
    console.log(e.target.value);
    setselectedPlaces([...selectedPlaces, { id: e.target.value }]);
    console.log("Places: ", selectedPlaces);
  };
  const departure_date = (e) => {
    setdeparture(e.target.value);
    console.log("departure: ", departure);
  };
  const return_date = (e) => {
    setreturnDate(e.target.value);
    console.log("returnDate: ", returnDate);
  };

  const config = {
    headers: { Authorization: `Bearer ${state.token}` },
  };

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    axios
      .get(`http://localhost:8080/Users/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        if (res.data.id === 1) {
          setType("Admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/Cities/")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // image upload
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setPicInfo(e.target.value.split("\\").pop());
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("/profileImages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            axios
              .put(
                `http://localhost:8080/Users/image/${data.id}`,
                {
                  image: "" + url + "",
                },
                config
              )
              .then((res) => {
                getInfo();
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    );
  };

  const CreateTrip = () => {
    console.log("info");
    console.log("to: ", departure);
    console.log("return: ", returnDate);
    console.log("currntUser", state.currentUser.id);
    console.log("places", selectedPlaces);

    axios
    .post("http://localhost:8080/Trips",{
      departure_date: departure,
      return_date: returnDate,
      users: [{
          id:state.currentUser.id
      }],
      places: selectedPlaces
},config)
    .then(() => {
      getInfo();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="profile-des">
      <div className="page-header"></div>
      <div className="main-profile">
        {data !== undefined ? (
          <>
            <div className="profile">
              <div className="avatar">
                <img
                  src={url || data.image || "http://via.placeholder.com/300"}
                  alt=""
                  className="img-raised rounded-circle img-fluid"
                />
              </div>
              <div className="name">
                <h3 className="title">{data.username}</h3>
                <p className="first-color">{type}</p>
              </div>
              {console.log("cId: ", state.currentUser.id)}
              {console.log("Id: ", data.id)}
              {console.log("isLoggedIn: ", state.isLoggedIn)}
              {state.isLoggedIn && data.id == state.currentUser.id && (
                <div className="upload">
                  <div className="two-div">
                    <label for="file-upload" className="custom-file-upload">
                      <i className="fa fa-upload"></i>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleChange}
                    />
                    <progress
                      className="j-self"
                      style={{ margin: "10px" }}
                      value={progress}
                      max="100"
                    />
                  </div>
                  <p style={{ fontSize: "12px" }}>{PicInfo}</p>
                  <button onClick={handleUpload} className="upload-btn">
                    Upload
                  </button>
                </div>
              )}
            </div>
            <div className="card-block">
              <h6 className="m-b-20 p-b-5 b-b-default ">
                <div className="b-size">Personal Information</div>
              </h6>
              <div className="row-grid">
                <div>
                  <p>Name:</p>
                  <h6 className="text-muted">{data.username}</h6>
                </div>
                <div>
                  <p>Phone Number:</p>
                  <h6 className="text-muted">{data.phoneNumber}</h6>
                </div>
                <div>
                  <p>Age:</p>
                  <h6 className="text-muted">{data.age}</h6>
                </div>
                <div>
                  <p>Email:</p>
                  <h6 className="text-muted">{data.email}</h6>
                </div>
                <div>
                  <p>Gender:</p>
                  <h6 className="text-muted">{data.gender}</h6>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="trips-card">
          <h6 className="m-b-20 p-b-5 b-b-default ">
            <div className="b-size">Trips Information</div>
          </h6>
          <div className="card-body">
            {data !== undefined
              ? data.trips.map((e, i) => {
                  return (
                    <div className="ticket plaace-card pointer" key={i} onClick ={ ()=>{
                      navigate(`/TripsDetails/${e.id}`);
                    }} >
                      <p>From: {e.departure_date}</p>
                      <p>To: {e.return_date}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>

        {state.currentUser.id == id && (<div className="trips-cr">
          <h6 className="m-b-20 p-b-5 b-b-default ">
            <div className="b-size">Create Trips</div>
          </h6>
          <div className="card-body">
            <div>
            <input
              className="inputs"
              type="text"
              name="Departure_date"
              placeholder="Departure date"
              required=""
              onChange={departure_date}
            />
            <input
              className="inputs"
              type="text"
              name="Return_date"
              placeholder="Return date"
              required=""
              onChange={return_date}
            />
            </div>

            <select onClick={handleSelectedCity} class="search-city" id="city">
              <option value="" disabled selected>
                Select City
              </option>
              {cities !== undefined
                ? cities.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })
                : ""}
            </select>

            <select
              onClick={handleselectedPlaces}
              class="search-city"
              id="city"
              multiple
            >
              <option value="" disabled selected>
                Places
              </option>
              {Places !== undefined
                ? Places.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })
                : ""}
            </select>
            <button
              onClick={() => {
                CreateTrip();
              }}
            >
              {" "}
              Create{" "}
            </button>
          </div>
        </div>)}
      </div>
    </div>
  );
}

export default Profile;
