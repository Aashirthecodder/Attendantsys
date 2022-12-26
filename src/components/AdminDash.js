import React from "react";
import { MdOutlineSettings } from "react-icons/md";
import "./AdminDash.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function AdminDash() {
  const { name } = useParams();
  console.log(name);
  return (
    <>
      <Link to="/read">
        <MdOutlineSettings className="settingbtn" />
      </Link>
      <div className="img-dash">
        <img src="/images/pic.jpg" alt="" />
        <br />
        <h2 className="head-dash">{name}</h2>
        <Link to="/Todays">
          <button className="btn-dash">Today's Availability</button>
        </Link>
        <Link to="/Stats">
          <button className="btn-dash">Overall Stats</button>
        </Link>
      </div>
    </>
  );
}

export default AdminDash;
