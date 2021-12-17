import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Search() {
    const navigate = useNavigate();

    const [data, setData] = useState();

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
    const [searchTerm, setSearchTerm] = useState("");
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
        <div className="g-wallpaper">
        </div>
                <div className="search-page">
                    <div className="search">
                        <h1>Search about Cities</h1> 
                        <input type="text" placeholder="Where to ?" value={searchTerm} onChange={handleChange} id="srch"/>
                        {/* <div className="group-btn">
                            <button className="btn">
                                <p>Hotals  <i class="fa fa-search"></i></p>
                            </button>
                            <button className="btn">
                                <p>Hotals  <i class="fa fa-search"></i></p>
                            </button>
                            <button className="btn">
                                <p>Hotals  <i class="fa fa-search"></i></p>
                            </button>
                            <button className="btn">
                                <p>Hotals  <i class="fa fa-search"></i></p>
                            </button>
                        </div> */}
                    </div>
                    
                <div className="cards">
                  {data !== undefined
                    ? data.map((e,i) => {
                      return (
                        <div className="card" key={i} onClick={() => { navigate(`/CityDetails/${e.id}`);}}>
                        <img className="img" src={e.image} alt=""/>
                        <h3>{e.name}</h3>
                        <p>{e.country.name}</p>
                      </div>
                      );
                    })
                    : "There is No result.."}
                </div>
                </div>
                </>
    )


}

export default Search;