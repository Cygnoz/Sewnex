import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Staffs = lazy(() => import("../pages/Staffs")); 
 
const StaffRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Staffs/>}></Route>
      
      </Routes>
    );
  };
  

export default StaffRoutes;
