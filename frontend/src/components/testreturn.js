// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './test.css'

// const Testpage = async (id) => {
//   const [Users, setUsers] = useState([]);
//   const [Qid, setQid] = useState({
//     id:null
//   });
//   const handleChange = (e) => {
//     setQid((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:8800/users");
//         setUsers(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchUsers();
//   }, []);
//   const handleClick = async e => {
//     try {
//       await axios.post("http://localhost:8800/users",Qid)
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   return (
//     <div>
//       <div className="wrapper-test">
//         {Users.map((user) => (
//           <h2>{user.username}</h2>
//         ))}
//       </div>
//       <input type="number" onChange={handleChange}/>
//       <button onClick={handleClick} className="asd">click</button>
//     </div>
//   );
// };

// export default Testpage;
