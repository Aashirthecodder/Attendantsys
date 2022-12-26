import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Stats = () => {
  const idGet = useParams();
  const userId = idGet.id;

  const [empData, setEmpData] = useState([]);
  const [searchEmp, setSearchEmp] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");

  function getData() {
    axios
      .get(`https://639314b5ab513e12c5027f08.mockapi.io/Employee/${userId}`)
      .then((res) => {
        setEmpData(res.data.history);
        setSearchEmp(res.data.history);
        console.log(res.data.history);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setEmpData(searchEmp);
    } else {
      const filterResult = searchEmp.filter((item) =>
        item.date.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setEmpData(filterResult);
    }
    setSearchBarValue(e.target.value);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 className="heading">Attendance Record</h2>

        <input
          value={searchBarValue}
          onInput={(e) => handleSearch(e)}
          className="attend-search"
          type="text"
          placeholder="Search byDate.."
        />
      </div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {empData.map((eachData, index) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>

                  <td>{eachData.date}</td>

                  <td>{eachData.status}</td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Stats;
