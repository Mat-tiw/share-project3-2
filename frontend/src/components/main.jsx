import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/main.css";
import logo from "../assets/wordbrand.svg";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "react-three-fiber";
import { Suspense, useState } from "react";
import DragAndDrop from "./drag-and-drop/dragAndDrop";
import FetchToImgList from "./fetchToImgList";
import img1 from "../assets/image_22.png";
import axios from "axios";

function Cloud(props) {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.y += 0.01;
  });
  const group = useRef();
  const { nodes, materials } = useGLTF("/cloud.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={boxRef} rotation-x={Math.PI * 0.5} rotation-y={Math.PI * 0.5}>
        <mesh
          geometry={nodes.Cloud_0.geometry}
          material={materials.CloudMaterial}
          scale={0.86}
        />
      </group>
    </group>
  );
}

export default function Main() {
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

  
  const location = useLocation();
  
  const recivcedData = location.state.userid;

  const navigates = useNavigate();
  
  const toUser = (e) => {
    console.log(e);
    navigates("/User", { state: recivcedData });
  };
  
  const toDisplay = (data) => {
    navigates("/Display", { state: data });
  };
  
  const modelRef = useRef(null);
  const creditRef = useRef(null);
  const uploadRef = useRef(null);
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
    
    const handleScroll = (elementRef) => {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    };
    const [number, setNumber] = useState(recivcedData);
    const [uploaderName, setuploaderName] = useState(location.state.username);
    const [models, setmodels] = useState([]);
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", text);
      formData.append("number", number);
      formData.append("uploadername",uploaderName);
      if(formData.file !== null || formData.text !== "")await axios.post("http://localhost:8800/upload", formData);
      else(window.location.reload())
    window.location.reload();
  };
  const [isShown, setIsshown] = useState(true);
  return (
    <div className="wrapper-main">
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <div className="test-flex">
            <p className="models" onClick={() => handleScroll(modelRef)}>
              MODELS
            </p>
            <p className="uploads" onClick={() => handleScroll(uploadRef)}>
              UPLOAD
            </p>
            <img src={logo} alt="" />
            <p className="credit" onClick={() => handleScroll(creditRef)}>
              CREDIT
            </p>
            <p
              className="users"
              onClick={() => {
                toUser();
              }}
            >
              USERS
            </p>
          </div>
        </div>
      </div>
      <div className="hero-main">
        <div className="iframe-wrapper-hero-main">
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
            src="https://sketchfab.com/models/d989e2cf9a0744cb8bcb90c2560bb409/embed?autospin=1&autostart=1"
          >
            {" "}
          </iframe>
        </div>
        <div className="text-wrapper-hero-main">
          <p className="header-text-main">Lorem ipsum dolor</p>
          <p className="text-sub-main">
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Fermentum leo vel orci porta non pulvinar
            neque. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl
            rhoncus. Vitae et leo duis ut diam quam nulla. Est placerat in
            egestas erat. Vel pharetra vel turpis nunc eget lorem.
          </p>
        </div>
      </div>
      <div className="hero-section-wrapper">
        <div className="sub-hero-section-main">
          <p className="header-sub-hero-main" ref={modelRef}>
            MODELS
          </p>
        </div>
        <div className="listimgcontainer" >
          {models.map((model)=>(
            <div className="wrapper-render" key={model.modelid}>
            <button onClick={()=> {UpdateViewCount(model.modelid);toDisplay(model.modelid);}}><FetchToImgList img={model.path} /></button>
            </div>
          ))}
        </div>
      </div>
      <div className="credit-header">
        <p className="credit-header-text" ref={creditRef}>
          CREDIT
        </p>
      </div>
      <div className="credit-wrapper">
        <div className="sub-text-wrapper-credit">
          <p>
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Fermentum leo vel orci porta non pulvinar
            neque. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl
            rhoncus. Vitae et leo duis ut diam quam nulla. Est placerat in
            egestas erat. Vel pharetra vel turpis nunc eget lorem.
          </p>
        </div>
        <div className="iframe-credit-wrapper">
          <iframe
            title="Rubber Duck in a Drink"
            frameborder="0"
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            src="https://sketchfab.com/models/3cb4cfaf1d284b9a9d9e156068899dc6/embed?autospin=1&autostart=1"
          >
            {" "}
          </iframe>
        </div>
      </div>
      <div className="upload-header">
        <p className="upload-header-text" ref={uploadRef}>
          UPLOAD
        </p>
      </div>
      <div className="Upload-wrapper">
        <div className="uploadCanvas-wrapper">
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[1, 1, 1]} />
              <Cloud />
            </Suspense>
          </Canvas>
          {isShown && (
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  Thumbnail:
                  <input
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </label>
                <br />
                <label>
                  Link:
                  <input
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                </label>
                <br />
                <br />
                <button type="submit" className="tosubmit-main">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer-text-container-main">
          <p className="git">GITHUB</p>
          <p className="mail">EMAIL</p>
          <p className="wordbrand">©SKYREF</p>
        </div>
      </div>
    </div>
  );
}