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
  const { id } = useParams();

  const config = {
    headers: {Authorization : `Bearer ${state.token}`},
  };

  useEffect(() => {
    getInfo();
    console.log("CurrentUser: ",state.currentUser);
    console.log("UserToken: ", state.token);
    console.log("IsLogIn: ", state.isLoggedIn);
  }, []);

  const getInfo = () =>{
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
  }

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
              .put(`http://localhost:8080/Users/image/${data.id}`, {
                image: "" + url + "",
              },config)
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

  const [PicInfo, setPicInfo] = useState("");
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
          "wait"
        )}

        <div className="trips-card">
          <h6 className="m-b-20 p-b-5 b-b-default ">
            <div className="b-size">Trips Information</div>
          </h6>
          <div className="card-body">
            {data !== undefined
              ? data.trips.map((e, i) => {
                  return (
                    <div
                      className="tp-card"
                      key={i}>
                      <div className="plaace-card">
                        {e.places.map((el, i) => {
                          return <p key={i} onClick={() => {
                            navigate(`/PlaceDetails/${el.id}`);
                          }}>{el.name}</p>;
                        })}
                      </div>
                      {/* <p>TripID: {e.id}</p> */}
                      <p>From: {e.departure_date}</p>
                      <p>To: {e.return_date}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
