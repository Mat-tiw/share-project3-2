import logos from "../assets/wordbrand.svg";
import mable from "../assets/mable.jpg";
import "../styles/user.css";
import { useState } from "react";
import UserModels from "./usermodels";
import UserLike from "./userlike";
import axios from "axios";
import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import FetchToImgList from "./fetchToImgList";

export default function User() {
  const location = useLocation();
  const userid = location.state
  const [users, setusers] = useState([]);
  const navigates = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/users/` + userid
        );
        setusers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const [models, setmodels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get("http://localhost:8800/images/w/"+userid);
        setmodels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModels();
  }, []);
  const [shownModels, setshownModels] = useState(true);
  const UpdateViewCount = (modelid) => {
    axios
      .post("http://localhost:8800/update-view-count/"+modelid)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
    };
    const toDisplay = (data) => {
      navigates("/Display", { state: data });
    };
    
  return (
    <>
      <div className="wrapperWhole" key={users.id}>
        <div className="img1">
          <div>
            <img src={logos} style={{ width: 100 }} alt="" />
          </div>
        </div>
          <div className="card1">
            <div></div>
            <div className="img2">
              <img src={mable} alt="" />
            </div>

            <div className="name">
              {users.map((user) => (
                <h2>{user.username}</h2>
              ))}
            </div>

            <div className="button1">
              <div className="fallowers1">
                <p>Followers</p>
              </div>
              <div className="fallowers2">
                <p>Following</p>
              </div>
            </div>
          </div>

          <div className="button2">
            <div
              onClick={() => {
                setshownModels(true);
              }}
              className={`models-react-active ${
                shownModels ? "models-react-active-ON" : ""
              }`}
            >
              <p className="models">MODELS</p>
            </div>
          </div>
          <div className="to-display-user-click">
            {shownModels === true && <UserModels />}
            {shownModels === false && <UserLike />}
          </div>
          {models.map((model)=>(
            <div className="wrapper-render" key={model.modelid}>
            <button onClick={()=> {UpdateViewCount(model.modelid);toDisplay(model.modelid);}}><FetchToImgList img={model.path} /></button>
            </div>
          ))}
      </div>
    </>
  );
}
