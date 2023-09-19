import "../styles/login.css";
import logos from "../assets/Wordbrand.png";
import img from "../assets/Login.png";
import { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "styled-components";
import { useState } from "react";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${img}); 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;
const Removetext = styles(Link)`
text-decoration: none;
color: aliceblue;
`;

export default function Login() {
  const nav = useNavigate();
  const [userInput, setUserInput] = useState({ field1: "", field2: "" });
  const [message, setMessage] = useState("");

  const handleUserInput = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    if(userInput.field1 == 'admin' && userInput.field2 == 'admin') nav("/admin",{state : true})
    event.preventDefault();
    axios
      .post("http://localhost:8800/compare", userInput)
      .then((response) => {
        const user = response.data.results
        nav("/Main", { state: user[0]});
      })
      .catch((error) => {
        console.error(error);
        window.location.reload();
        setMessage("An error occurred while fetching data.");
      });
  };
  return (
    <div>
      <GlobalStyle />
      <div className="card">
        <div className="app-logo">
          <div>
            <img src={logos} style={{ width: 110 }} />
          </div>
        </div>
        <div className="login">
          <p>LOGIN</p>
        </div>
        <form action="" onSubmit={handleFormSubmit}>
        <div className="input" id="txt">
          <input
            type="text"
            placeholder="Username"
            name="field1"
            value={userInput.field1}
            onChange={handleUserInput}
          />
          <i></i>
        </div>
        <div className="input" id="txt">
          <input
            type="password"
            placeholder="Password"
            name="field2"
            value={userInput.field2}
            onChange={handleUserInput}
          />
          <i></i>
        </div>

        <label>
          <div className="checkbox">
            <input type="checkbox" id="box" className="toCheck" /> I have read
            the agreement
          </div>
        </label>

        <div className="Newtosky">
          <p>
            New to SKYREF?
            <Removetext />
            <Link to={"/Register"}>Register</Link> here
          </p>
        </div>

        <div className="containerbutton" id="btn-button">
          <button type="submit" className="toAuth">
            Login
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
