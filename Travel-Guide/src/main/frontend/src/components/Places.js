import { useEffect, useState } from "react";
import axios from "axios";

function Places() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/Places/")
      .then((res) => {
        console.log("places");
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <><div className="g-wallpaper">
    </div>
    
    <div className="cities-list">
    <div className="container">
        {data !== undefined
          ? data.map((e) => {
            return (
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{e.name}</h4>
                  <p className=" card-discription">Description: {e.description}</p>
                  <p className=" card-discription">
                      Location: {e.location}{" "}
                    Country Name: {e.city.name} {" "}
                  </p>
                  <p>tags: {e.tag.map((el) => {
                      return( el.name )
                    })}</p>
                  <p>Trips: {e.trips.map((el) => {
                      return( <div><p>{el.departure_date} to {el.return_date}</p>
                        <p>Trip Mates: {el.users.map((element)=>{
                            return(element.username)
                        })} </p>
                        </div> )
                    })}</p>
                </div>
              </div>
            );
          })
          : "There is No result.."}
      </div>
            
    </div></>
  );
}

export default Places;
