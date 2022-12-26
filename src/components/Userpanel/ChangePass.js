import React, { useState, useEffect } from "react";
import "./ChangePass.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ChangePass() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState(0);
  const [cpass, setCpass] = useState(0);

  const enterName = (e) => {
    setName(e.target.value);
  };

  const id = useParams();
  const abc = id.id;

  const changeHandler = (e) => {
    setPass(e.target.value);
  };

  const confrimHandler = (e) => {
    setCpass(e.target.value);
  };

  const cancelPass = () => {
    nav("/");
  };

  const nav = useNavigate();

  const changePass = (e) => {
    e.preventDefault();

    if (name === "" || pass === "" || cpass === "") {
      alert("fields cannot be !!!");
    } else if (pass === cpass && pass.length === 4 && cpass.length === 4) {
      axios.put(`https://639314b5ab513e12c5027f08.mockapi.io/Employee/${abc}`, {
        name,
        pin: pass,
      });

      nav("/");
    } else if (pass !== cpass) {
      alert("pin should be Same ");
    } else {
      alert("pin should have 4 digits ");
    }
  };
  return (
    <div className="forget-pass">
      <h1 className="forget-h1">Sign in as User</h1>
      <div className="main-div">
        <h2 style={{ color: "white", borderBottom: "32px" }}>Change Pin</h2>

        <input
          type="text"
          className="forget-input"
          placeholder="Enter Name"
          onChange={enterName}
        />
        <br />

        <input
          maxLength={4}
          className="forget-input"
          placeholder="Pin"
          onChange={changeHandler}
        />
        <br />

        <input
          maxLength={4}
          className="forget-input"
          placeholder="Confirm Pin"
          onChange={confrimHandler}
        />
        <br />

        <button style={{ backgroundColor: "#da153b" }} onClick={cancelPass}>
          {" "}
          Cancel
        </button>

        <button style={{ backgroundColor: "#20dac2" }} onClick={changePass}>
          Save
        </button>
      </div>
    </div>
  );
}

export default ChangePass;
