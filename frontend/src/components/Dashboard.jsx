import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [users, setUsers] = useState([]);
  // array of users
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch(() => alert("Error in fetching users"));
  }, [token]);

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <h3>User Name: Email Id</h3>
      <ol>
        {
            users.map(usr=>(
                <li key={usr._id}>Name: {usr.name} ---- Email: {usr.email} </li>
            ))
        }
      </ol>
    </div>
  );
};

export default Dashboard;
