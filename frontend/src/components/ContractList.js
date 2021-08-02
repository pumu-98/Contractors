import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ContractList.css';

const ContractList = () => {
  const [contractor, setContractor] = useState([]);
  const [contractSearch, setContractSearch] = useState("");

  useEffect(() => {
    axios.get("/api/contractor").then((response) => setContractor(response.data));
  }, []);

  return (
    <div>
      <h1>List of Current Contractors</h1>
      <input
        type="text"
        placeholder="Search ..."
        onChange={(e) => {
          setContractSearch(e.target.value);
        }}
        style={{ margin: "20px" }}
      />
      <br /><br />
      <ul style={{ listStyleType: "none" }}>
        {contractor
          .filter((contract) => {
            if (contract.name.toLowerCase().includes(contractSearch.toLowerCase())) {
              return contract;
            }
          })
          .map((contract) => {
            return (
              <div className="card">
              <li key={contract._id}>
                <Link to={`/contract/${contract._id}`}>
                  {/* <b>{contract.contNum}</b>  */}
              
                  <b>{contract.contNum}</b>
                  <br/>
                </Link>{" "}
                <b className="name">{contract.name}</b><br/>
                <div className="ex">
                <h6>Due date = {contract.date}</h6>
                
                </div> <br/>
                <h6>  {contract.month}</h6><br/>
                <h6>contact - </h6> {contract.phone}&nbsp;
                <br/> 
              </li>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default ContractList;
