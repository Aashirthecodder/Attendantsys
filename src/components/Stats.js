import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Read.css";

const Stats = () => {
  const [employee, setEmployee] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function getEmployeeData() {
    axios
      .get("https://639314b5ab513e12c5027f08.mockapi.io/Employee")
      .then((response) => {
        setEmployee(response.data);
        setSearchEmployee(response.data);
      });
  }

  useEffect(() => {
    getEmployeeData();
  }, []);

  const searchEmp = (e) => {
    if (e.target.value === "") {
      setEmployee(searchEmployee);
    } else {
      const searchResult = searchEmployee.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.totalhrs.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setEmployee(searchResult);
    }
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 className="heading">Overall Stats</h2>

        <input
          value={searchValue}
          onInput={(e) => searchEmp(e)}
          className="attend-search"
          type="search"
          placeholder="Search Here.."
        />
      </div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Total Hrs.</th>
            <th scope="col">Daily Average Hrs.</th>
          </tr>
        </thead>
        {employee.map((eachData) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{eachData.id}</th>

                <td>{eachData.name}</td>

                <td>{eachData.totalhrs}</td>
                <td>{eachData.dailyhrs}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default Stats;
