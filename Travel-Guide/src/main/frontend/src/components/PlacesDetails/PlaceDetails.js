import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

function PlaceDetails(){
    const navigate = useNavigate();
    const [data, setData] = useState();
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:8080/Places/${id}`)
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);

    return(
        <div className="place-detail">
        <div>
        {data !== undefined ?
            <div>
                <img className="img" src={data.image} alt=""/>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <p>Country Name: {data.location}</p>
            </div>: "wait" }
        </div>

        <div className="reviews-card">
        {data !== undefined && data.reviews.length !== 0 ? 
        <h2>Comments</h2> :""}
            {data !== undefined ?
            data.reviews.map((e,i)=>{
                return(
                    <div className="review" key={i}>
                        <p onClick={()=>{navigate(`/Profile/${e.user.id}`);}}>{e.user.username}</p>
                        <h1>{e.comment}</h1>
                        <p>Rating: {e.rating}</p>
                    </div>
                )
            }) : ""}

        </div>
    </div>
    )
}

export default PlaceDetails;