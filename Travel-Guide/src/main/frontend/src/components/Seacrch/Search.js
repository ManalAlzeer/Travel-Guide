import { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [countries, setCountries] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCtry, setselectedCtry] = useState("");
  const [srchResult, setsrchResult] = useState("");

  const getCity = () =>{
    axios
    .get("http://localhost:8080/Cities/")
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const getCountry = () =>{
    axios
    .get("http://localhost:8080/Countries")
    .then((res) => {
      setCountries(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getCountry();
    getCity();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountry = (e) =>{
    setselectedCtry(e.target.value);
  }

  const sear = () => {
    if(selectedCtry !== "" && searchTerm === ""){
      const results = data.filter((e) =>
      e.country.name.includes(selectedCtry)
    );
    console.log(results);
    setsrchResult(results);
    }
    if(searchTerm !== ""){
      const results = data.filter((e) =>
      e.name.toLowerCase().includes(searchTerm)
    );
    console.log(results);
    setsrchResult(results);
    }
  };

  return (
    <>
      <div className="search-page">
        <div className="search-wallpaper">
          <div className="search">
            <h1>Ready to have unforgettable trip ?</h1>

            <div class="g-grid">
              <select onClick={handleCountry} class="search-slt" id="country">
              <option>Select country</option>
              { countries !== undefined ? 
                countries.map((e)=>{
                  return(<option>{e.name}</option>)
                }) :""}
              </select>
              <input type="text" placeholder="Where to ?" value={searchTerm} onChange={handleChange} id="srch" />
              <button onClick={()=>{sear()}} type="button" class="wrn-btn pointer">
                Show
              </button>
            </div>
          </div>
        </div>

        <div className="cards">
          {srchResult !== "" ? 
          srchResult.map((e, i) => {
              return (
                <div
                  className="card"
                  key={i}
                  onClick={() => {
                    navigate(`/CityDetails/${e.id}`);
                  }}
                >
                  <img className="img" src={e.image} alt="" />
                  <div className="card-text">
                    <h3>{e.name}</h3>
                    <p className="des-over">{e.description}</p>
                    <div className="two-col">
                      <p>
                        {e.country.continents} - {e.country.name}
                      </p>
                      <p style={{ textAlign: "end" }}>
                        language: {e.country.language}
                      </p>
                    </div>
                  </div>
                </div>);}) :""}
        </div>
      </div>
    </>
  );
}

export default Search;
