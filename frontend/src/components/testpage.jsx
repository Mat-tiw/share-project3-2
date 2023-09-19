import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Testpage() {
  const location = useLocation();
  const id = location.state.id
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8800/users/`+location.state.id);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }


  return (
    <div>
    {data.map(datas =>(
      <h2>{datas.username}</h2>
    ))}
    <h2>{id}</h2>
  </div>
  );
}

export default Testpage;
