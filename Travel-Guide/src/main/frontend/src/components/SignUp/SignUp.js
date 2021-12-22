import { login, UserType } from "../../reducers/Login/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SignUp.css"

function SignUp() {
  const [msg, setmsg] = useState("");
  const [msg2, setmsg2] = useState("");
  const [msg3, setmsg3] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState();

  // signUp form

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

  const getUser = () => {
    const theuser = {
      email: userinfo,
      password: password,
    };

    users.forEach((e) => {
      if (e.email === theuser.email && e.password === theuser.password) {
        if (e.id === 1) {
          console.log("Hi Admin ;)");
          const action = login(e);
          const action2 = UserType("Admin");
          dispatch(action);
          dispatch(action2);
          navigate("/AdminPage");
        } else {
          console.log("Hi Travel ;)");
          const action = login(e);
          const action2 = UserType("Travel");
          dispatch(action);
          dispatch(action2);
          navigate("/");
        }
      } else {
        setmsg("Email or Password is not correct !");
      }
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
                type="email"
                name="email"
                onChange={usernameValue}
                placeholder="Email"
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
