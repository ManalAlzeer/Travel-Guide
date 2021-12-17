import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

function CityDetails(){
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

    return(
    <div className="city-detail">
        <div>
        {data !== undefined ?
            <div>
                <img className="img" src={data.image} alt=""/>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <p>Country Name: {data.country.name} -
                 Language: {data.country.language} - {data.country.continents}</p>
            </div>: "wait" }
        </div>

        <div className="places-card">
        {data !== undefined && data.places.length !== 0 ? 
        <h1 style={{textAlign:"center"}}>Places</h1> :""}
            {data !== undefined ? 
            data.places.map((e,i)=>{
                return(
                    <div className="p-card" key={i} onClick={()=>{navigate(`/PlaceDetails/${e.id}`);}}>
                        <h1>{e.name}</h1>
                        <p>{e.description}</p>
                        <p>{e.location}</p>
                    </div>
                )
            }) : ""}

        </div>
    </div>
    )
}

export default CityDetails;