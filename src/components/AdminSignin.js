import React, { useState, useEffect } from "react";
import "./UserSign.css";

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { ImGoogle } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminSignin() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(0);
  const [empData, setEmpData] = useState([]);
  let empRecord = null;
  const nav = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePin = (e) => {
    setPin(e.target.value);
  };

  function getEmpData() {
    axios
      .get("https://639314b5ab513e12c5027f08.mockapi.io/Employee")
      .then((res) => {
        setEmpData(res.data);
      });
  }

  useEffect(() => {
    getEmpData();
  }, []);

  function SignIn(e) {
    e.preventDefault();

    empData.forEach((e) => {
      if (e.email === email) {
        empRecord = { ...e };
      }
    });

    if (empRecord?.email === email && empRecord?.pin === pin) {
      console.log(empRecord.id);
      nav(`/Admindash/${empRecord.name}`);
    } else if (empRecord?.email === email && pin === "0000") {
      alert("email already existsss");
    } else if (empRecord?.email !== email && pin !== "0000") {
      alert("If you are a new user default pin is 0000");
    } else {
      alert("wrong pin");
    }
  }

  //   const aashir = empData.findIndex(
  //     (e) => (e.email === email && e.pin === pin) || pin === "0000"
  //   );
  //   aashir > -1 ? nav("/Admindash") : alert("Wrong Username or Password");
  // }

  return (
    <div className="signin">
      <h1>Sign In as admin</h1>
      <input
        className="input"
        type="text"
        placeholder="UserName"
        onChange={changeEmail}
      />
      <br />
      <input
        maxLength={4}
        className="input"
        type="number"
        placeholder="PinCode"
        onChange={changePin}
      />

      <br />
      <button onClick={(e) => SignIn(e)}>Login</button>
      <p>or sign in using social platforms</p>
      <RiFacebookCircleFill className="icons" />
      <AiOutlineTwitter className="icons" />
      <ImGoogle className="icons" />
      <FaLinkedinIn className="icons" />
      <p>
        or are you an User?{" "}
        <Link to="/">
          <a>Sign in as user instead</a>
        </Link>
      </p>
    </div>
  );
}

export default AdminSignin;
