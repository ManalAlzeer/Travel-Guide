import "./AdminPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";

function AdminPage() {
  const navigate = useNavigate();
  const [TotalPlaces, setTotalPlaces] = useState();
  const [TotalCities, setTotalCities] = useState();
  const [TotalCountries, setTotalCountries] = useState();
  const [TotalTags, setTotalTags] = useState();

  useEffect(() => {
    getTotalsInfo();
  }, []);

  // totals For first div
  const getTotalsInfo = () => {
    axios.get(`http://localhost:8080/Places/`).then((res) => {
      console.log("Plasec", res.data.length);
      setTotalPlaces(res.data.length);
    });
    axios.get(`http://localhost:8080/Countries`).then((res) => {
      console.log("Countries", res.data.length);
      setTotalCountries(res.data.length);
    });
    axios.get(`http://localhost:8080/Cities`).then((res) => {
      console.log("cities", res.data.length);
      setTotalCities(res.data.length);
    });
    axios.get(`http://localhost:8080/Tags`).then((res) => {
      console.log("Tags:", res.data.length);
      setTotalTags(res.data.length);
    });
  };

  // Upload img
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setInfo(e.target.value.split("\\").pop());
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
          });
      }
    );
  };
  const [info, setInfo] = useState("");

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
              <p style={{ fontSize: "12px" }}>{info}</p>
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
          />
          <textarea placeholder="Description"></textarea>
          {/* tags */}
          <div class="tags">
            <a href class="color">
              Hotal
            </a>
            <a href class="color">
              Malls
            </a>
            <a href class="color">
              Resturant
            </a>
            <a href class="color">
              Plaeing Area
            </a>
          </div>
          <select class="search-slt" id="country">
            <option>Select country</option>
            <option>Select country</option>
            <option>Select country</option>
            <option>Select country</option>
            <option>Select country</option>
            <option>Select country</option>
          </select>

          <button className="upload-btn">
                Create
              </button>
        </div>
      </div>

      <div className="third-div">
        <div>
          <p className="Admin-heading">Users List</p>
          <div className="users-list">
            <div className="comment-body">
              <img
                src="http://via.placeholder.com/100"
                className="re-pic pointer"
                alt=""
              />
              <div class="contact_text">
                <h4 className="pointer">Manal Alzeer</h4>
                <p>Have 7 Trips</p>
              </div>
            </div>
            <div className="comment-body">
              <img
                src="http://via.placeholder.com/100"
                className="re-pic pointer"
                alt=""
              />
              <div class="contact_text">
                <h4 className="pointer">Sara Saad</h4>
                <p>Have 8 Trips</p>
                <p>Email: Manal.alzeer.ruh.java@tuwaiq.sa</p>
                <p>Phone Number: 0544704266</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="Admin-heading">Places List</p>
          <div className="Places-list">
            <div className="comment-body">
              <img
                src="http://via.placeholder.com/100"
                className="re-pic pointer"
                alt=""
              />
              <div class="contact_text">
                <h4 className="pointer">Manal Alzeer</h4>
                <p>
                  Set inside an old train station, this unique shopping mall is
                  the first in Spain to open every day of the year. It offers
                  well-known brand stores, a food court, a
                </p>
              </div>
            </div>
            <div className="comment-body">
              <img
                src="http://via.placeholder.com/100"
                className="re-pic pointer"
                alt=""
              />
              <div class="contact_text">
                <h4 className="pointer">Manal Alzeer</h4>
                <p>
                  Set inside an old train station, this unique shopping mall is
                  the first in Spain to open every day of the year. It offers
                  well-known brand stores, a food court, a
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
