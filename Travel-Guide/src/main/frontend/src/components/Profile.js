import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

function Profile() {

    const navigate = useNavigate();
    const [data, setData] = useState();
    const { id } = useParams();

  
    useEffect(() => {
        axios
          .get(`http://localhost:8080/Users/${id}`)
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);

    return(
        <>
        <div className="profile-card">
          {data !== undefined ?
          <div className="card-body" style={{textAlign: "center"}}>
                  <h1 className="card-title">{data.username}</h1>{" "}<br/>
                  <p className=" card-discription">phone: {data.phoneNumber}</p>{" "}<br/>
                  <p className=" card-discription">email: {data.email}{" "}</p><br/>
                  <p>Age: {data.age} {" "}</p>
                  <p>gender: {data.gender} {" "}</p>
          </div>: "wait" }

          <div className="trips-card">
        {data !== undefined && data.trips.length !== 0 ? 
        <h1 style={{textAlign:"center"}}>Trips List</h1> :""}
            {data !== undefined ? 
            data.trips.map((e,i)=>{
                return(
                    <div className="p-card" key={i} onClick={()=>{navigate(`/PlaceDetails/${e.id}`);}}>
                        <p>tripID: {e.id}</p>
                        <p>from: {e.departure_date}</p>
                        <p>to: {e.return_date}</p>
                        <div>{e.places.map((el,i)=>{
                          return(
                            <p key={i}>{el.name}</p>
                          )
                        })}</div>
                    </div>
                )
            }) : ""}
        </div>
        </div>


        </>
    )


}

export default Profile;