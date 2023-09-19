import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Admin() {
  const nav = useNavigate();
  const location = useLocation();
  const [users, setusers] = useState([]);
  const [models, setmodels] = useState([]);
  const [isactive, setisactive] = useState(location.state);
  console.log(location.state);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/`);
        setusers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get("http://localhost:8800/image");
        setmodels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModels();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/user/` + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteModel = async (modelid) => {
    try {
      await axios.delete(`http://localhost:8800/image/` + modelid);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {isactive !== true && nav("/")}
      <h1>user</h1>
      {users.map((user) => (
        <div className="user" key={user.userid}>
          <h1>{user.username}</h1>
          <h2>{user.userid}</h2>
          <button
            className="btn-admin"
            onClick={() => handleDelete(user.userid)}
          >
            delete
          </button>
        </div>
      ))}
      <h1>model</h1>
      {models.map((model) => (
        <div className="models-admin" key={model.modelid}>
          <img src={model.path} alt={model.name} />
          <button
            className="btn-admin"
            onClick={() => handleDeleteModel(model.modelid)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
