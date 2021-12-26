import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./CityDetails.css";

function CityDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState();

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

  const placesChange = (e) => {
    if(e.target.value !== "All"){
    axios
    .get(`http://localhost:8080/Places/getPlaces/${id}/ByTags/${e.target.value}`)
    .then((res) => {
      console.log(res.data);
      setSearchResult(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else{
    setSearchResult([]);
  }
  };

  return (
    <div className="city-detail">
      {data !== undefined ? (
        <div className="tow-divs">
          <div className="relative">
            <div
              style={{
                backgroundImage: "url(" + data.image + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: "60vh",
                backgroundRepeat: "no-repeat",
              }}
              className="absolute"
            ></div>
          </div>

          <div className="city-info">
            <h4>
              {data.country.name} - {data.country.continents}
            </h4>
            <h2>{data.name}</h2>
            <p className="font-fi">{data.description}</p>
            <p className="sh-font">language: {data.country.language}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div class="grid-places">
        {data !== undefined && data.places.length !== 0 ? (
          <>
            <div className="places-srch">
              <h1 className="title">Places</h1>
              <div class="cntr">
              <label for="opt5" class="radio">
                  <input
                    type="radio"
                    name="rdo"
                    id="opt5"
                    onChange={placesChange}
                    value="All"
                    class="hidden"
                  />
                  <span class="label">X</span>
                </label>
                <label for="opt1" class="radio">
                  <input
                    type="radio"
                    name="rdo"
                    id="opt1"
                    onChange={placesChange}
                    value="Malls"
                    class="hidden"
                  />
                  <span class="label">Malls</span>
                </label>
                <label for="opt2" class="radio">
                  <input
                    type="radio"
                    name="rdo"
                    id="opt2"
                    onChange={placesChange}
                    value="Museum"
                    class="hidden"
                  />
                  <span class="label">Museum</span>
                </label>
                <label for="opt3" class="radio">
                  <input
                    type="radio"
                    name="rdo"
                    id="opt3"
                    onChange={placesChange}
                    value="Restaurant"
                    class="hidden"
                  />
                  <span class="label">Restaurant</span>
                </label>
                <label for="opt4" class="radio">
                  <input
                    type="radio"
                    name="rdo"
                    id="opt4"
                    onChange={placesChange}
                    value="Hotel"
                    class="hidden"
                  />
                  <span class="label">Hotel</span>
                </label>
              </div>
            </div>

            <div className="s-grid">
              {" "}
              {searchResult !== undefined
                ? searchResult.map((e) => {
                    return (
                      <div
                        className="sup pointer"
                        onClick={() => {
                          navigate(`/PlaceDetails/${e.id}`);
                        }}
                      >
                        <img src={e.image} alt="place" />
                        <div className="scd">
                          <h5 className="third-color">{e.name}</h5>
                          <div>
                            <p>{e.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>

            {data.places.map((e, i) => {
              return (
                <div className="p-card" key={i}>
                  <div class="col">
                    <img src={e.image} alt="place" />
                  </div>
                  <div class="col">
                    <div class="card_cont">
                      <h3>{e.name}</h3>
                      <p className="font-fi">{e.description}</p>

                      <button
                        className="moreBtn"
                        onClick={() => {
                          navigate(`/PlaceDetails/${e.id}`);
                        }}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CityDetails;
