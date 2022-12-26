import React, { useState, useEffect } from "react";

import axios from "axios";
import "./Create.css";
const HEADER = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

const Create = ({ getemployeeData }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [totalhrs, setTotalHrs] = useState(0);
  const [dailyhrs, setdailyHrs] = useState(0);

  const submitEmpRecord = (e) => {
    e.preventDefault();

    const empData = {
      name: name,
      position: position,
      email: email,
      totalhrs: totalhrs,
      dailyhrs: dailyhrs,
    };
    axios
      .post("https://639314b5ab513e12c5027f08.mockapi.io/Employee", empData, {
        HEADER,
        withCredentials: false,
      })
      .then(() => {
        getemployeeData();
      });
  };

  return (
    <>
      <h2
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "20px" }}
      >
        Add Employee
      </h2>

      <form className="create-form">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">TotalHrs</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setTotalHrs(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DailyAverageHrs.</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setdailyHrs(e.target.value)}
          />
        </div>

        <button
          style={{ height: "35px", marginTop: "33px" }}
          type="submit"
          className="btn btn-primary"
          onClick={submitEmpRecord}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
