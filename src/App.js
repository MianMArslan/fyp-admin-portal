import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarAdmin from "./components/Admin Component/Navbar";
import Home from "./components/Admin Component/home page";
import Applayout from "./components/Admin Component/sidebar/layout";
import UserDetail from "./components/Admin Component/Users";
import AgencyDetail from "./components/Admin Component/Agency";
import Suggestion from "./components/Admin Component/Suggestion";
import Location from "./components/Admin Component/location";
import Logout from "./components/Admin Component/Logout";

function App() {
  return (
    <Router>
      <NavbarAdmin />
      <Routes>
        <Route element={<Applayout />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/UserDetail" element={<UserDetail />}></Route>
          <Route path="/AgencyDetail" element={<AgencyDetail />}></Route>
          <Route path="/Suggestion" element={<Suggestion />}></Route>
          <Route path="/Location" element={<Location />}></Route>
          <Route path="/Logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
