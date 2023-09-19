import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./testcss.css";
export default function Testlanding() {
  const [models, setmodels] = useState([]);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [number, setNumber] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    formData.append('number', number);
    await axios.post('http://localhost:8800/upload', formData);
    window.location.reload();
  };
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

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          File:
          <input
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </label>
        <br />
        <label>
          Text:
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <br />
        <label>
          Number:
          <input
            type="number"
            value={number}
            onChange={(event) => setNumber(event.target.valueAsNumber)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="test">
        {models.map((model) => (
          <div className="wrapperTest">
            <h1>{model.modelid}</h1>
            <img src={model.path} alt={"." + model.name} />
            <iframe
            title="Investigation Board"
            frameborder="0"
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            src={model.link}
          >
            {" "}
          </iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
