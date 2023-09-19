import HeaderTemplate from "./headerTemplate";
import { useRef, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import "../styles/display.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

// export function Shoe(props) {
//   const group = useRef();
//   const { nodes, materials } = useGLTF("/shoe.glb");
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
//       <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
//       <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
//       <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
//       <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
//       <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
//       <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
//       <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
//     </group>
//   );
// }

export default function Display() {
  const location = useLocation();
  const [models, setmodels] = useState([]);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get("http://localhost:8800/images/"+location.state);
        setmodels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModels();
  }, []);
  return (
    <>
      <div className="canvasHolder">
        {models.map((model)=>(
          <div className="iframeholder">
            <HeaderTemplate view={model.viewcount} uploadername={model.uploadername} />
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
          src={model.link}
        >
          {" "}
        </iframe>
          </div>
        ))}
      </div>
    </>
  );
}
