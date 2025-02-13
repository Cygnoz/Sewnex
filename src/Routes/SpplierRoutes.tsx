import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ViewSupplier from "../Modules/Supplier/View Supplier/ViewSupplier";

const Supplier = lazy(() => import("../pages/Supplier")); 
 
const SupplierRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Supplier/>}></Route>
        <Route path="/view/:id" element={<ViewSupplier/>}></Route>

      </Routes>
    );
  };
  

export default SupplierRoutes;
