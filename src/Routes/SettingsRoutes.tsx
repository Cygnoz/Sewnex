import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../Modules/Settings/Organization/Profile";

const Settings = lazy(() => import("../pages/Settings")); 
 
const CustomerRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Settings/>}></Route>
        <Route path="/settings/organization/profile" element={<Profile/>}></Route>

      </Routes>
    );
  };
  

export default CustomerRoutes;
