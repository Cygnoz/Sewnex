import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Supplier = lazy(() => import("../pages/Supplier")); 
 
const SupplierRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Supplier/>}></Route>
      
      </Routes>
    );
  };
  

export default SupplierRoutes;
