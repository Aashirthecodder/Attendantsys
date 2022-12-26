import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Read.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Create from "./Create";
import Update from "./Update";

const Read = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchEmpData, setSearchEmpData] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const setLocalStorage = (id, name, position, email, totalhrs, dailyhrs) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("position", position);
    localStorage.setItem("email", email);
    localStorage.setItem("totalhrs", totalhrs);
    localStorage.setItem("dailyhrs", dailyhrs);
    setShow(true);
  };

  function getEmployeeData() {
    axios
      .get("https://639314b5ab513e12c5027f08.mockapi.io/Employee")
      .then((res) => {
        setEmployeeData(res.data);
        setSearchEmpData(res.data);
      });
  }

  function deleteEmployee(id) {
    axios
      .delete(`https://639314b5ab513e12c5027f08.mockapi.io/Employee/${id}`)
      .then(() => {
        getEmployeeData();
      });
  }

  useEffect(() => {
    getEmployeeData();
  }, []);

  const searchEmployee = (e) => {
    if (e.target.value === "") {
      setEmployeeData(searchEmpData);
    } else {
      const filterResult = searchEmpData.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setEmployeeData(filterResult);
    }
    setFilterVal(e.target.value);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 className="heading">Setting</h2>

        <input
          value={filterVal}
          onInput={(e) => searchEmployee(e)}
          className="attend-search"
          type="search"
          placeholder="Search Here.."
        />
      </div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Email</th>
            <th scope="col">TotalHrs</th>
            <th scope="col">DailyHrs</th>
            <th>Actions</th>
          </tr>
        </thead>
        {employeeData.map((eachData, index) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{index + 1}</th>

                <td>{eachData.name}</td>
                <td>{eachData.position}</td>
                <td>{eachData.email}</td>
                <td>{eachData.totalhrs}</td>
                <td>{eachData.dailyhrs}</td>

                <td style={{ width: "10px" }}>
                  <Link to="">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        setLocalStorage(
                          eachData.id,
                          eachData.name,
                          eachData.position,
                          eachData.email,
                          eachData.totalhrs,
                          eachData.dailyhrs
                        )
                      }
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td style={{ width: "10px" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEmployee(eachData.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <Create getemployeeData={getEmployeeData} />

      <Modal show={show} onHide={handleClose} closeButton>
        <div style={{ backgroundColor: "#00bfa6" }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="modal-body">
            <Update
              getEmployeeData={getEmployeeData}
              closeModel={handleClose}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default Read;
