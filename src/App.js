import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Read from "./components/Read";
import AdminSignin from "./components/AdminSignin";
import AdminDash from "./components/AdminDash";
import Todays from "./components/Todays";
import Stats from "./components/Stats";
import UserSign from "./components/Userpanel/UserSign";
import UserDash from "./components/Userpanel/UserDash";
import Record from "./components/Userpanel/Record";
import ChangePass from "./components/Userpanel/ChangePass";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UserSign />}></Route>
          <Route exact path="/Changepass/:id" element={<ChangePass />}></Route>
          <Route exact path="/Record/:id" element={<Record />}></Route>
          <Route exact path="/Userdash/:id" element={<UserDash />}></Route>

          <Route exact path="/Stats" element={<Stats />}></Route>
          <Route exact path="/Todays" element={<Todays />}></Route>
          <Route exact path="/Admindash/:name" element={<AdminDash />}></Route>
          <Route exact path="/AdminSign" element={<AdminSignin />}></Route>
          <Route exact path="/Read" element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
