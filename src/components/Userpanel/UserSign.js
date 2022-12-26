import React, { useState, useEffect } from "react";
import "./UserSign.css";

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { ImGoogle } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HEADER = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

function UserSign() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(0);

  const [employesData, setEmployesData] = useState([]);
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePin = (e) => {
    setPin(e.target.value);
  };

  const navigatePage = useNavigate();

  function getEmployeeData() {
    axios
      .get("https://639314b5ab513e12c5027f08.mockapi.io/Employee")
      .then((res) => {
        setEmployesData(res.data);
      });
  }

  useEffect(() => {
    getEmployeeData();
  }, []);

  const sendEmployeeData = async () => {
    const employeeRecord = {
      email,
      pin,
    };
    const res = await axios.post(
      "https://639314b5ab513e12c5027f08.mockapi.io/Employee",
      employeeRecord,
      {
        HEADER,
        withCredentials: false,
      }
    );
    return res;
  };

  function SignIn(e) {
    e.preventDefault();

    let empData = null;
    employesData.forEach((e) => {
      if (e.email === email) {
        empData = { ...e };
      }
    });

    if (empData?.email === email && empData?.pin === pin && pin !== "0000") {
      localStorage.setItem("userid", empData.id);
      const existingUserId = empData.id;
      localStorage.setItem("email", email);
      localStorage.setItem("pin", pin);
      return navigatePage(`/Userdash/${existingUserId}`, {
        state: { employesData: empData },
      });
    } else if (empData?.email !== email && pin === "0000") {
      sendEmployeeData().then((res) => {
        var loginId = res.data.id;

        navigatePage(`/Changepass/${loginId}`);
        getEmployeeData();
      });
    } else if (empData?.email === email && pin === "0000") {
      alert("email already existsss");
    } else if (empData?.email !== email && pin !== "0000") {
      alert("If you are a new user default pin is 0000");
    } else {
      alert("wrong pass");
    }
  }

  return (
    <div className="signin">
      <h1>Sign In as User</h1>
      <input
        className="input"
        type="email"
        placeholder="UserName"
        onChange={changeEmail}
      />
      <br />
      <input
        className="input"
        placeholder="PinCode"
        onChange={changePin}
        maxLength={4}
      />
      <br />
      <button onClick={(e) => SignIn(e)}>Login</button>
      <p>or sign in using social platforms</p>
      <RiFacebookCircleFill className="icons" />
      <AiOutlineTwitter className="icons" />
      <ImGoogle className="icons" />
      <FaLinkedinIn className="icons" />
      <p>
        or are you an admin?{" "}
        <Link to="/AdminSign">
          {" "}
          <a>Sign in as admin instead</a>
        </Link>
      </p>
    </div>
  );
}

export default UserSign;
