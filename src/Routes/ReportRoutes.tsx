import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Report = lazy(() => import("../pages/Report")); 
 
const ReportRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Report/>}></Route>
      
      </Routes>
    );
  };
  

export default ReportRoutes;
