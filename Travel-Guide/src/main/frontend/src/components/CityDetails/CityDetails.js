import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./CityDetails.css"

function CityDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Cities/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="city-detail">
      {data !== undefined ? (
      <div className="tow-divs">
          <div className="relative">
            <div style={{
              backgroundImage: "url(" + data.image + ")",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              minHeight: "60vh",
              backgroundRepeat: 'no-repeat'
            }} className="absolute"></div>
          </div>

          <div className="city-info">
            <h4>{data.country.name} - {data.country.continents}</h4>
            <h2>{data.name}</h2>
            <p className="font-fi">{data.description}</p>
            <p className="sh-font">language: {data.country.language}
            </p>
          </div>

      </div>
) : (
  "wait"
)}

      <div class="grid-places">
        {data !== undefined && data.places.length !== 0 ? (
          <h1 className="title">Places</h1>
          ) : ("")}
        {data !== undefined
          ? data.places.map((e, i) => {
              return (
              <div className="p-card" key={i}>
                <div class="col">
                  <img src="https://vid.alarabiya.net/images/2018/02/13/3f470406-96ee-4dc8-8282-5324ade4b10d/3f470406-96ee-4dc8-8282-5324ade4b10d_16x9_1200x676.png?width=1138" alt="city" />
                </div>
                <div class="col">
                  <div class="card_cont">
                    <h3>{e.name}</h3>
                    <p className="font-fi">{e.description}</p>

                    <button className="moreBtn" onClick={() => { navigate(`/PlaceDetails/${e.id}`); }}>More Details</button>
                  </div>
                </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>

  );
}

export default CityDetails;
