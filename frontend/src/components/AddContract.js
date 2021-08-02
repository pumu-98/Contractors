import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";

const AddContract = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [contract, setContract] = useState({
    contNum:"",
    name: "",
    date: "",
    phone: "",
    month:"",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContract = {
      contNum:contract.contNum,
      name: contract.name,
      date: contract.date,
      phone: contract.phone,
      month:contract.month,
      addedBy: userData.user.name,
    };

    axios
      .post("/api/contractor", newContract, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/contractlist"));

    setContract({
      contNum:"",
      name: "",
      date: "",
      phone: "",
      month:"",
    });
  };

  // const handleChange = (e) => {
  //   const { contNum, value } = e.target;
  //   setContract((oldContract) => {
  //     return {
  //       ...oldContract,
  //       [contNum]: value,
  //     };
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContract((oldContract) => {
      return {
        ...oldContract,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <h1>Add Details Here</h1>
      <form onSubmit={handleSubmit}>
      {/* <label>Contractor ID&nbsp; </label>
      <input
          type="text"
          name="contNum"
          value={contract.contNum}
          required
          onChange={handleChange}
        />
        <br /> */}
        <label>Contractor Name&nbsp; </label>
       <input
          type="text"
          name="name"
          value={contract.name}
          required
          onChange={handleChange}
        />
        <br/>
        <label>Contractor ID&nbsp; </label>
      <input
          type="text"
          name="contNum"
          value={contract.contNum}
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
          type="text"
          name="phone"
          value={contract.phone}
          onChange={handleChange}
        />
         <br />
        <label>Month&nbsp; </label>
        <select 
          type="text"
          name="month"
          value={contract.month}
          onChange={handleChange}>
          <option value="jan">January</option>
          <option value="feb">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="aug">August</option>
          <option value="sep">September</option>
          <option value="oct">October</option>
          <option value="nov">November</option>
          <option value="dec">December</option>
          </select>
        <br />
        {userData.user ? (
          <Button variant="success" type="submit">Add </Button>
        ) : (
          <p>You need to be logged in to Add Contractor Details !</p>
        )}
      </form>
    </div>
  );
};

export default AddContract;
