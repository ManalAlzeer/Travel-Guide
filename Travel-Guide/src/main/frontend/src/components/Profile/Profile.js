import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { storage } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { updateImage } from "../../reducers/Login/action";
import "./Profile.css"

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [type, setType] = useState("Traveler")
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Users/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        if(res.data[0].id === 1){
          setType("Admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // image upload 
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
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
            })
            .then((res) => {
              const action = updateImage(res.data);
              dispatch(action);
            })
            .catch((err) => {
              console.log(err);
            });
          });
      }
    );
  };

  return (
    <div className="profile-des">    
      <div className="page-header">   
      </div>
      <div className="main-profile">
        {data !== undefined ? (<>
        <div className="profile">
	        <div className="avatar">
	          <img src={url || data.image || "http://via.placeholder.com/300"} alt="" class="img-raised rounded-circle img-fluid"/>
	        </div>
          <div class="name">
	          <h3 class="title">{data.username}</h3>
						<p>{type}</p> 
          </div>
          <div className="upload">
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
	        </div>
	      </div>
        <div className="card-block">
          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
          <div className="b-size">Personal Information</div>
          </h6>
          <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Name:</p>
                        <h6 className="text-muted f-w-400">
                        {data.username}
                        </h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Phone Number:</p>
                        <div className="text-muted f-w-400">
                        {data.phoneNumber}
                        </div>
                      </div>
          </div>
          <div className="row">
                  <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Age:</p>
                        <h6 className="text-muted f-w-400">
                        {data.age}
                        </h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email:</p>
                        <h6 className="text-muted f-w-400">
                        {data.email}
                        </h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Gender:</p>
                        <h6 className="text-muted f-w-400">
                        {data.gender}
                        </h6>
                      </div>
          </div>
        </div>
        </>) : ( "wait"
        )}

      <div className="trips-card">
          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
          <div className="b-size">Trips Information</div>
          </h6>
          <div className="card-body">
          {data !== undefined
            ? data.trips.map((e, i) => {
                return (
                  <div className="tp-card" key={i} onClick={() => { navigate(`/PlaceDetails/${e.id}`); }}>
                     <div className="plaace-card">
                      {e.places.map((el, i) => {
                        return <p key={i}>{el.name}</p>;
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
