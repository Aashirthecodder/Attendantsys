import axios from "axios";
import React, { useState, useEffect } from "react";

const Update = ({ getEmployeeData, closeModel }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [totalhrs, setTotalHrs] = useState(0);
  const [dailyhrs, setdailyHrs] = useState(0);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setPosition(localStorage.getItem("position"));
    setEmail(localStorage.getItem("email"));
    setTotalHrs(localStorage.getItem("totalhrs"));
    setdailyHrs(localStorage.getItem("dailyhrs"));
  }, []);

  const updateData = (e) => {
    e.preventDefault();
    axios
      .put(`https://639314b5ab513e12c5027f08.mockapi.io/Employee/${id}`, {
        name: name,
        position: position,
        email: email,
        totalhrs: totalhrs,
        dailyhrs: dailyhrs,
      })
      .then(() => {
        getEmployeeData();
        closeModel();
      });
  };

  return (
    <>
      <h2>Update</h2>

      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">TotalHrs</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setTotalHrs(e.target.value)}
            value={totalhrs}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DailyAverageHrs.</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setdailyHrs(e.target.value)}
            value={dailyhrs}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={updateData}>
          Update
        </button>
      </form>
    </>
  );
};

export default Update;
