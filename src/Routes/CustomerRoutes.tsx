import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SeeCustomerDetails from "../Modules/Customer/SeeCustomerDetails";

const Customer = lazy(() => import("../pages/Customer")); 
 
const CustomerRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Customer/>}></Route>
        <Route path ="customerview/:id" element={<SeeCustomerDetails/>}> </Route>

      
      </Routes>
    );
  };
  

export default CustomerRoutes;
