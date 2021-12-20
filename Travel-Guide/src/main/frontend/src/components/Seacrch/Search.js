import { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css"
import { useNavigate } from "react-router-dom";


function Search() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
          .get("http://localhost:8080/Cities/")
          .then((res) => {
            console.log(res.data[0].id);
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        sear();
    };
    const sear = () => {
        console.log(searchTerm);
        const results = data.filter((e) =>
          e.name.toLowerCase().includes(searchTerm)
        );
        console.log(results);
        setData(results);
      };

    return(
        <>
        <div className="search-page">
          <div className="search-wallpaper">
            <div className="search">
            <h1>Ready to have unforgettable trip ?</h1> 
            <input type="text" placeholder="Where to ?" value={searchTerm} onChange={handleChange} id="srch"/>
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            <select class="form-control search-slt" id="exampleFormControlSelect1">
                                <option>Rating</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                            </select>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            <select class="form-control search-slt" id="exampleFormControlSelect1">
                                <option>Select country</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                            </select>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            <select class="form-control search-slt" id="exampleFormControlSelect1">
                                <option>Select Tag</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                            </select>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            <button type="button" class="btn wrn-btn">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
          </div>
                    
          <div className="cards">
            {data !== undefined ? data.map((e,i) => {
              return (  <div className="card" key={i} onClick={() => { navigate(`/CityDetails/${e.id}`);}}>
                          <img className="img" src={e.image} alt=""/>
                          <div className="card-text">
                          <h3>{e.name}</h3>
                          <p className="des-over">{e.description}</p>
                          <div className="two-col">
                          <p>{e.country.continents} - {e.country.name}</p>
                          <p style={{textAlign:"end"}}>language: {e.country.language}</p>
                          </div>
                          </div>
                        </div>
                      ); 
            }) : <p className="massage-error">There is No result..</p>}
          </div>
        </div>
        </>
    )


}

export default Search;