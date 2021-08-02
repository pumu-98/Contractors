import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Profile = () => {
  const [contractor, setContract] = useState([]);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/contractor").then((response) => setContract(response.data));
  }, []);

  const userDelete = () => {
    axios
      .delete("/api/users/profile", {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/contractlist"));

    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <h1>User Profile of {userData.user.name}</h1>
      <br />
      <h5>
        <b>User ID: </b>
        {userData.user.id}
      </h5>
      <h5>
        <b>Register Date: </b>
        {userData.user.date.toString().slice(0, 10) +
          " @ " +
          userData.user.date.toString().slice(11, 19)}
      </h5>
      <br />
      <h3>
        <b>details Added by {userData.user.name}:</b>
      </h3>

      <ul style={{ listStyleType: "none" }}>
        {contractor
          .filter((contract) => {
            if (contract.addedBy === userData.user.name) {
              return contract;
            }
          })
          .map((contract) => {
            return (
              <li key={contract._id}>
                <Link to={`/contract/${contractor._id}`}>
                <b>{contract.contNum}</b>
                  <b>{contract.name}</b>
                </Link>{" "}
                ({contract.date}) - {contract.phone}
                &nbsp;[Added on{" "}
                <i>
                  {contract.date.toString().slice(0, 10) +
                    " @ " +
                  contract.date.toString().slice(11, 19)}
                </i>
                ]
              </li>
            );
          })}
      </ul>

      <Button className="btn btn-danger" onClick={userDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default Profile;
