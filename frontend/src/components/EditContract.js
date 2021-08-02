import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditContract = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [contract, setContract] = useState({
    contNum:"",
    name: "",
    date: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get("/api/contractor/" + match.params.id)
      .then((response) => setContract(response.data));
  }, []);

  const contractUpdate = () => {
    axios
      .put("/api/contractor/" + match.params.id, contract, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/contractlist"));
  };

  const contractDelete = () => {
    axios
      .delete("/api/contractor/" + match.params.id, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/contractlist"));
  };

  const handleChange = (e) => {
    const { contNum, value } = e.target;
    setContract((oldContract) => {
      return {
        ...oldContract,
        [contNum]: value,
      };
    });
  };

    return (
     
      <div>
      <h1>Editing {contract.contNum}</h1>
      <p>
        <b>ID: {contract._id}</b>
      </p>
      <label>Contractor ID&nbsp; </label>
      <input
          type="text"
          name="contNum"
          value={contract.contNum}
          required
          onChange={handleChange}
        />
        <br />
        <label>Contractor Name&nbsp; </label>
       <input
          type="text"
          name="name"
          value={contract.name}
          required
          onChange={handleChange}
        />
        <br />
        <label>Date&nbsp; </label>
        <input
          type="date"
          name="date"
          value={contract.date}
          onChange={handleChange}
        />
        <br />
        <label>Phone&nbsp; </label>
        <input
          type="number"
          name="phone"
          value={contract.phone}
          onChange={handleChange}
        />
        <br />
      {userData.user ? (
        <>
          <Button className="btn btn-warning" onClick={contractUpdate}>
            Update Details
          </Button>
          &nbsp;
          <Button className="btn btn-danger" onClick={contractDelete}>
            Delete Details
          </Button>
        </>
      ) : (
        <p>You need to log in to edit or delete!</p>
      )}
  
    </div>
  );
};

export default EditContract;
