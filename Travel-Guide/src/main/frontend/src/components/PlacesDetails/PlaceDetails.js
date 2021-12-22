import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import "./PlacesDetails.css";

function PlaceDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () =>{
    axios
    .get(`http://localhost:8080/Places/${id}`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

//   add comment form
const state = useSelector((state) => {
    return {
      currentUser: state.usersReducer.currentUser,
      isLoggedIn: state.usersReducer.isLoggedIn,
    };
  });

const [cmt, setCmt] = useState();
const [rt, setRt] = useState();

const changeCmt = (e) => {
    setCmt(e.target.value);
    console.log(cmt);
  };

const ratingChange = (e) => {
    setRt(e.target.value);
    console.log(rt);
  };

const setReview = () => {
    axios.post("http://localhost:8080/Places/addReview", {
        id : data.id,
        reviews :[{
        rating: rt,
        comment: cmt,
        user: {id: state.currentUser.id}
        }]
    }).then((res) => {
            console.log(res.data);
            getInfo();
          })
          .catch((err) => {
            console.log(err);
          });
}
   



  return (
    <div className="place-detail">
      <div className="g-info">
        <div className="background">
          <div className="card">
            {data !== undefined ? (
              <div class="blog_cont">
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8587f199412131.5ef23f961f9e0.jpg"
                  alt="place"
                />
                <h3>{data.name}</h3>
                <p>{data.description}</p>
                <p class="sublittle">
                  <i class="fas fa-map-marker marker"></i> {data.location}
                </p>
                {/* tags */}
                <div class="tags">
                  {data.tag.map((e, i) => {
                    return (
                      <a key={i} href class="color">
                        {e.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="comment">
        <h4 className="heading">Comments</h4>
        <div class="reviews-card">
        {data !== undefined
          ? data.reviews.map((e, i) => {
              return (
          <div class="comment-body">
              <img onClick={() => { navigate(`/Profile/${e.user.id}`);}} src={e.user.image}
              className="re-pic pointer" alt={e.user.username} />
              <div class="contact_text">
                <h4 className="pointer" onClick={() => { navigate(`/Profile/${e.user.id}`);}}>{e.user.username}</h4>
                <p>{e.comment}</p>
                {[...Array(e.rating)].map((_, i) => {return(
                    <label class="fa fa-star" style={{color:'yellow'}}></label>
                )})}
            </div>
          </div>
            );
        })
      : ""}

          {state.isLoggedIn && (<div class="comment-inputs">
            <label>Your Comment: </label>
            <textarea placeholder="Comment" onChange={changeCmt}></textarea>
            <div class="rating">
              <label>Rating:</label>
              <div class="rating-css">
                <input type="radio" name="rating" id="rating1" value="1" onChange={ratingChange} />
                <label for="rating1" class="fa fa-star"></label>
                <input type="radio" name="rating" id="rating2" value="2" onChange={ratingChange} />
                <label for="rating2" class="fa fa-star"></label>
                <input type="radio" name="rating" id="rating3" value="3" onChange={ratingChange} />
                <label for="rating3" class="fa fa-star"></label>
                <input type="radio" name="rating" id="rating4" value="4" onChange={ratingChange} />
                <label for="rating4" class="fa fa-star"></label>
                <input type="radio" name="rating" id="rating5" value="5" onChange={ratingChange} />
                <label for="rating5" class="fa fa-star"></label>
              </div>
            </div>
            <button className="submit" onClick={() => {setReview();}}>Send</button>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
