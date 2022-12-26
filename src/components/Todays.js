import React, { useState, useEffect } from "react";
import "./Todays.css";
import axios from "axios";

function Todays() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");
  const currentDate = new Date().toLocaleDateString();
  const getEmployeeData = () => {
    axios
      .get("https://639314b5ab513e12c5027f08.mockapi.io/Employee")
      .then((res) => {
        setEmployeeData(res.data);
        setSearchEmployee(res.data);
      });
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const SearchBar = (e) => {
    if (e.target.value === "") {
      setEmployeeData(searchEmployee);
    } else {
      const searchedResult = searchEmployee.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setEmployeeData(searchedResult);
    }
    setSearchBarValue(e.target.value);
  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <div>
          <h2> Today's Availability </h2>
        </div>
        <div>
          <input
            value={searchBarValue}
            onInput={(e) => SearchBar(e)}
            className="attend-search"
            type="search"
            placeholder="Search Here.."
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="tables">
          <h2 className="table-title">Present</h2>
          {employeeData.map((e, i) => {
            const condition = e.history.some((e) => {
              if (e.status === "Present" && e.date === currentDate) {
                return true;
              }
            });

            return (
              <>
                {condition === true ? (
                  <h3 className="employeeData">{e.name}</h3>
                ) : null}
              </>
            );
          })}
        </div>
        <div className="tables">
          <h2 className="table-title">Absent</h2>
          {employeeData.map((e, i) => {
            const condition = e.history.every((e) => {
              if (e.date !== currentDate) {
                return true;
              }
            });

            return (
              <>
                {condition === true ? (
                  <h3 className="employeeData">{e.name}</h3>
                ) : null}
              </>
            );
          })}
        </div>
        <div className="tables">
          <h2 className="table-title">Leave</h2>
          {employeeData.map((e, i) => {
            const condition = e.history.some((e) => {
              if (e.status === "Leave" && e.date === currentDate) {
                return true;
              }
            });

            return (
              <>
                {condition === true ? (
                  <h3 className="employeeData">{e.name}</h3>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Todays;
