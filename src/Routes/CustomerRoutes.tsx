import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Customer = lazy(() => import("../pages/Customer")); 
 
const CustomerRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Customer/>}></Route>
      
      </Routes>
    );
  };
  

export default CustomerRoutes;
