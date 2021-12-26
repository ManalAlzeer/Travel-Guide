import { login, UserType, seToken } from "../../reducers/Login/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";
import axios from "axios";
import "./SignUp.css"
import jwt_decode from "jwt-decode";


function SignUp() {
  const [msg, setmsg] = useState("");
  const [msg2, setmsg2] = useState("");
  const [msg3, setmsg3] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState();

  // signUp form

  useEffect(() => {
    axios
      .get("http://localhost:8080/Users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const [Username, setUsername] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [pass, setPass] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [Email, setEmail] = useState();

  const changeUsername = (e) => {
    setUsername(e.target.value);
    console.log(Username);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
    console.log(Email);
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    console.log(phoneNumber);
  };
  const changeAge = (e) => {
    setAge(e.target.value);
    console.log(age);
  };
  const changePassword = (e) => {
    setPass(e.target.value);
    console.log(pass);
  };

  const genderChange = (e) => {
    setGender(e.target.value);
    console.log(gender);
  };

  // login forms
  const [userinfo, setUserinfo] = useState("");
  const [password, setPassword] = useState("");

  const usernameValue = (e) => {
    setUserinfo(e.target.value);
  };
  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const getUser = () => {
    const theuser = {
      username: userinfo,
      password: password,
    };
    axios
    .post("http://localhost:8080/login", {
      username: theuser.username,
      password: theuser.password 
    })
    .then((res) => {
      console.log(res.data.access_token);
      const token = res.data.access_token;
      const decoded = jwt_decode(token);

      console.log("token: ",token);
      console.log(decoded.roles[0]);

      const action = seToken(token)
      const action2 = login(decoded)
      const action3 = UserType(decoded.roles[0]);
      dispatch(action);
      dispatch(action2);
      dispatch(action3)

      navigate("/");

    })
    .catch((err) => {
      console.log(err);
      setmsg("You don't have account, please SignUp")
    });
    
  };

  const setUser = () => {
    let flag = 0;

    users.forEach((e) => {
      if (e.phoneNumber === phoneNumber || e.email === Email) {
        flag = 1;
      }
    });
      if (flag === 1) {
        setmsg2("This user exist !");
      } else {
        console.log("Currect :)");
        axios
          .post("http://localhost:8080/Users", {
            username: "" + Username + "",
            password: "" + pass + "",
            age: age,
            phoneNumber: "" + phoneNumber + "",
            email: "" + Email + "",
            gender: "" + gender + "",
            role:"Traveler"
          })
          .then((res) => {
            console.log(res.data);
            setmsg2("");
            navigate("/SignUp")
            setmsg3("seccsusfull , Log In please");
          })
          .catch((err) => {
            console.log(err);
          });
      }
   
  };

  return (
    <>
      <div className="wallpaper">
        <div className="mainBody">
          <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="signup">
              <label className="labels" htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                className="inputs"
                type="text"
                name="username"
                placeholder="Username"
                required=""
                onChange={changeUsername}
              />
              <div className="two-input">
                <input
                  className="inputs"
                  type="text"
                  name="PhoneNumber"
                  placeholder="phoneNumber"
                  required=""
                  onChange={changePhoneNumber}
                />
                <input
                  className="inputs"
                  type="text"
                  name="age"
                  placeholder="Age"
                  required=""
                  onChange={changeAge}
                />
              </div>

              <div className="radios">
                <label>Gender: </label>
                <label className="gender-input">
                  <input
                    className="gender-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={genderChange}
                  />{" "}
                  Female{" "}
                </label>
                <label className="gender-input">
                  <input
                    className="gender-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={genderChange}
                  />{" "}
                  Male{" "}
                </label>
              </div>

              <input
                className="inputs"
                type="email"
                name="email"
                placeholder="Email"
                required=""
                onChange={changeEmail}
              />
              <input
                className="inputs"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                onChange={changePassword}
              />
              <p style={{ color: "red", textAlign: "center" }}>{msg2}</p>
              <p style={{ color: "grean", textAlign: "center" }}>{msg3}</p>
              <button
                onClick={() => {
                  setUser();
                }}
              >
                Sign up
              </button>
            </div>

            <div className="login">
              <label className="labels" htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                className="inputs"
                type="text"
                name="text"
                onChange={usernameValue}
                placeholder="Username"
                required=""
              />
              <input
                className="inputs"
                type="password"
                name="pswd"
                onChange={passwordValue}
                placeholder="Password"
                required=""
              />
              <p style={{ color: "red", textAlign: "center" }}>{msg}</p>
              <button
                type="button"
                onClick={() => {
                  getUser();
                }}
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
