import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Testingcompare = () => {
  const location = useLocation();
  const [users, setusers] = useState([]);
  const jack = 'jack'
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/usersq/`+jack
        );
        setusers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="wrapper-tester" key={users.id}>
      <h2>{location.state}</h2>
      <div className="name">
        {users.map((user) => (
          <h2>{user.username}</h2>
        ))}
      </div>
    </div>
  );
};

export default Testingcompare;
