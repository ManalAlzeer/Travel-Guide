import { useEffect, useState } from "react";
import axios from "axios";

function Cities() {
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

  return (
    <><div className="g-wallpaper">
    </div>
    
    <div className="cities-list">
    <div className="cards">
        {data !== undefined
          ? data.map((e) => {
            return (
              
                <div className="card">
                  <h4>{e.name}</h4>
                  <p>Description: {e.description}</p>
                  <p>
                    Country Name: {e.country.name} {" "}
                    Continent Name: {e.country.continents}{" "}
                    Country Language: {e.country.language}
                  </p>
                </div>
            );
          })
          : "There is No result.."}
                        </div>

      </div>
      </>
  );
}

export default Cities;
