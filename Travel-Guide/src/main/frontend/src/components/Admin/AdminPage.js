import "./AdminPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";
import { useSelector } from "react-redux";


function AdminPage() {
  const state = useSelector((state) => {
    return {
      token: state.usersReducer.token,
    };
  });
  const config = {
    headers: {Authorization : `Bearer ${state.token}`},
  };

  const navigate = useNavigate();
  const [TotalPlaces, setTotalPlaces] = useState();
  const [Places, setPlaces] = useState();
  const [Users, setUsers] = useState();
  const [Cities, setCities] = useState();
  const [TotalCities, setTotalCities] = useState();
  const [TotalCountries, setTotalCountries] = useState();
  const [TotalTags, setTotalTags] = useState();
  const [Tags, setTags] = useState();

  useEffect(() => {
    getInfo();
  }, []);

// All info
  const getInfo = () => {
    axios.get(`http://localhost:8080/Places/`).then((res) => {
      console.log("Plasec", res.data.length);
      setTotalPlaces(res.data.length);
      setPlaces(res.data);
    });
    axios.get(`http://localhost:8080/Countries`).then((res) => {
      console.log("Countries", res.data.length);
      setTotalCountries(res.data.length);
    });
    axios.get(`http://localhost:8080/Cities`).then((res) => {
      console.log("cities", res.data.length);
      setTotalCities(res.data.length);
      setCities(res.data);
    });
    axios.get(`http://localhost:8080/Tags`).then((res) => {
      console.log("Tags:", res.data.length);
      setTotalTags(res.data.length);
      setTags(res.data);
    });
    axios.get(`http://localhost:8080/Users`).then((res) => {
      console.log("Users:", res.data.length);
      setUsers(res.data);
    });
  };

  // Upload img
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
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
          .ref("/images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
          });
      }
    );
  };
  const [PicInfo, setPicInfo] = useState("");

  const [selectedCities, setselectedCities] = useState("");
  const [selectedTags, setselectedTags] = useState([]);
  const [selectedDes, setselectedDes] = useState("");
  const [selectedName, setselectedName] = useState("");
  const [selectedLocation, setselectedLocation] = useState("");

  const handleLocation = (e) =>{
    setselectedLocation(e.target.value);
  }
  const handleCities = (e) =>{
    setselectedCities(e.target.value);
  }
  const tagsChange = (e) => {
    setselectedTags([...selectedTags, {id: e.target.value}]);
    console.log(selectedTags);
  }
  const descChange = (e)=>{
    setselectedDes(e.target.value);
  }
  const nameChange = (e)=>{
    setselectedName(e.target.value);
  }

  const createPlace = () =>{
    console.log("PlaceName: ",selectedName);
    console.log("PlaceUrl: ",url);
    console.log("Placedes: ",selectedDes);
    console.log("PlaceCities: ",selectedCities);
    console.log("PlaceTags: ",selectedTags);
    console.log("PlaceLocation: ",selectedLocation);

    axios
    .post("http://localhost:8080/Places", {
      name: selectedName,
      description:selectedDes,
      image: url,
      location:selectedLocation,
      city:{
          id:selectedCities
      },
      tag:selectedTags
  
    },config)
    .then((res) => {
      console.log("secsussfull ", res.data);
      getInfo();
    })
    .catch((err) => {
      console.log(err);
    });


  }

  const deletePlace = (Place_id)=>{
    // console.log(Place_id);  
    axios
    .delete(`http://localhost:8080/Places/${Place_id}`,config)
    .then((res) => {
      console.log("delete secsussfully");
      getInfo();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }
  const deleteUser = (User_id)=>{
    console.log(User_id);  
    axios
    .delete(`http://localhost:8080/Users/${User_id}`,config)
    .then((res) => {
      console.log("delete secsussfully");
      getInfo();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <div className="admin-page">
      <p className="Admin-heading">We have</p>
      <div className="first-div">
        <div style={{ background: "#A8A8A8" }} className="card">
          <h2>{TotalPlaces}</h2>
          <p>Places</p>
        </div>
        <div style={{ background: "#2D2422" }} className="card">
          <h2>{TotalCountries}</h2>
          <p>Countries</p>
        </div>
        <div style={{ background: "#d3a65a" }} className="card">
          <h2>{TotalCities}</h2>
          <p>Cities</p>
        </div>
        <div style={{ background: "#9b1e1eed" }} className="card">
          <h2>{TotalTags}</h2>
          <p>Tags</p>
        </div>
      </div>

      <div className="sec-div">
        <p className="Admin-heading">Add Place</p>
        <div className="sec-card">
          <div className="img">
              <img src={url ||"http://via.placeholder.com/100"} alt="" className="c-img" />
              <progress
                className="j-self"
                style={{ margin: "10px" }}
                value={progress}
                max="100"
              />
              <p style={{ fontSize: "12px" }}>{PicInfo}</p>
              <div className="grid-two">
              <label for="file-upload" className="custom-file-upload">
                      select image
                    </label>
              <input id="file-upload" className="file-upload" type="file" onChange={handleChange} />
              <button onClick={handleUpload} className="upload-btn">
                Upload
              </button>
              </div>
          </div>
          <input
            className="inputs"
            type="text"
            name="CityName"
            placeholder="City Name"
            required=""
            onChange={nameChange}
          />
          <input
            className="inputs"
            type="text"
            name="Location"
            placeholder="Location"
            required=""
            onChange={handleLocation}
          />
          <textarea placeholder="Description" onChange={descChange} ></textarea>
          <div class="tags">
          { Tags !== undefined ? 
              Tags.map((e)=>{
                return(
            <label>
            <input type="checkbox" name="chbox" onChange={tagsChange} value={e.id}/>
            <span class="label" value={e.id}>{e.name} </span></label>
            )
          }) :""}
          </div>
          <select onClick={handleCities} class="search-slt" id="City">
            <option>Select country</option>
            { Cities !== undefined ? 
              Cities.map((e)=>{
                return(<option value={e.id}>{e.name}</option>)
              }) :""}
          </select>

          <button className="upload-btn" onClick={()=>{createPlace();}}>
                Create
              </button>
        </div>
      </div>

      <div className="third-div">
        <div>
          <p className="Admin-heading">Users List</p>
          <div className="users-list">
          {Users !== undefined ? 
           Users.map((e)=>{
            return(
            <div className="comment-body">
              <img
                src={e.image || "http://via.placeholder.com/60"}
                className="re-pic pointer"
                alt=""
                onClick={() => { navigate(`/Profile/${e.id}`);}}
              />
              <div class="contact_text">
                <h4 className="pointer" onClick={() => { navigate(`/Profile/${e.id}`);}}>{e.username}</h4>
                <p style={{color:'#d3a65a'}}>{e.id === 1 ? "Admin" : "Traveler"}</p>
                <p className="sm-p">{e.email}</p>
              </div>
              <a href onClick={()=>{deleteUser(e.id);}} className="close pointer" ></a>
            </div>)
          })
            : " "}
          </div>
        </div>

        <div>
          <p className="Admin-heading">Places List</p>
          <div className="Places-list">
            {Places !== undefined ?
            Places.map((e)=>{
              return(
                <div className="comment-body">
                <img
                  src={e.image}
                  className="re-pic pointer"
                  alt=""
                  onClick={() => { navigate(`/PlaceDetails/${e.id}`);}}
                />
                <div class="contact_text"  onClick={() => { navigate(`/PlaceDetails/${e.id}`);}}>
                  <h4 className="pointer">{e.name}</h4>
                  <p className="reduceP">{e.description}
                  </p>
                  <p className="location">{e.location}</p>
                </div>
                <a href onClick={()=>{deletePlace(e.id);}} className="close pointer" ></a>
              </div>
              )
            }):""}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
