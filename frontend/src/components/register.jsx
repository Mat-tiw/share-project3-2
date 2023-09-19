import "../styles/register.css";
import logos from "../assets/Wordbrand.png";
import img from "../assets/Login.png";
import { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${img}); 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;

export default function Register() {
  const [user, setuser] = useState({
    username: "",
    password: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/user", user);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      window.location.reload();
    }
  };
  console.log(user);

  return (
    <div>
      <GlobalStyle />
      <div className="card">
        <div className="cover">
          <div className="app-logo">
            <div>
              <img src={logos} style={{ width: 110 }} />
            </div>
          </div>
          <div className="login">
            <p>REGISTER</p>
          </div>

          <form className="regi-tomove" onSubmit={handleClick}>
            <div className="input" id="txt">
              <input
                onChange={handleChange}
                type="text"
                placeholder="username"
                name="username"
              />
              <i></i>
            </div>
            <div className="input" id="txt">
              <input
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="Password"
              />
              <i></i>
            </div>
            <div className="input" id="txt">
              <input
                onChange={handleChange}
                type="password"
                placeholder="Re-enter password"
                name="password"
              />
              <i></i>
            </div>

            <div className="Newtosky-toremove">
              <p>New to SKYREF? Register here</p>
            </div>

            <div className="containerbutton" id="btn-button">
                <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
