import React, { useEffect, useState } from "react";
import "./UserDash.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiH1 } from "react-icons/ri";

const HEADER = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

function UserDash() {
  const [data, setData] = useState({});
  const [disable, setDisable] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState("");
  const { state } = useLocation();
  const { employesData } = state;
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  useEffect(() => {
    setDisable(JSON.parse(window.localStorage.getItem("disable")));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("disable", disable);
  }, [disable]);

  const previousRecord = () => {
    navigate(`/Record/${employesData.id}`);
  };

  const getEmpData = async () => {
    await axios
      .get(
        `https://639314b5ab513e12c5027f08.mockapi.io/Employee/${employesData.id}`
      )
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getEmpData();
  }, []);

  // const object = data.find((obj) => obj.id === data.id);
  // console.log(object);

  const punchAttendance = (e) => {
    setDisable(true);

    setAttendanceMarked("your Attendace has been marked for today");
    setTimeout(() => setDisable(false), 24 * 60 * 60 * 1000);

    let initalHistory = { history: [{ date: currentDate, status: "Present" }] };

    if (data?.history?.length > 0) {
      initalHistory = {
        history: [...data.history, { date: currentDate, status: "Present" }],
      };
    }
    // data.history.some((e) => {
    //   if (e.date !== currentDate) {
    // data.id.map((e) => {
    //   console.log(e.name);
    // });
    try {
      axios
        .put(
          `https://639314b5ab513e12c5027f08.mockapi.io/Employee/${employesData.id}`,
          initalHistory,
          {
            HEADER,
            withCredentials: false,
          }
        )
        .then(async () => {
          await getEmpData();
        });
    } catch (err) {
      console.log(err);
    }
    //   } else {
    //     console.log("abcd");
    //   }
    // });
  };
  const onleave = () => {
    setDisable(true);
    setAttendanceMarked("your Attendace has been marked for today");

    setTimeout(() => setDisable(false), 24 * 60 * 60 * 1000);

    let initalHistory = { history: [{ date: currentDate, status: "Leave" }] };

    if (data?.history?.length > 0) {
      initalHistory = {
        history: [...data.history, { date: currentDate, status: "Leave" }],
      };
    }

    try {
      axios
        .put(
          `https://639314b5ab513e12c5027f08.mockapi.io/Employee/${employesData.id}`,
          initalHistory,
          {
            HEADER,
            withCredentials: false,
          }
        )
        .then(async () => {
          await getEmpData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="img-dash">
        <img src="/images/pic.jpg" alt="" />
        <br />
        <h2 className="head-dash">{data.name}</h2>
        <button
          disabled={disable}
          onClick={punchAttendance}
          id="btn-active"
          className="btn-dash"
        >
          Punch Attendence
        </button>
        <button disabled={disable} onClick={onleave} className="btn-dash">
          Apply for Leave
        </button>

        <button onClick={previousRecord} className="btn-dash">
          Watch Previous Record
        </button>
      </div>
      <h3 style={{ textAlign: "center", fontSize: "17px", color: "red" }}>
        {attendanceMarked}
      </h3>
    </>
  );
}

export default UserDash;
