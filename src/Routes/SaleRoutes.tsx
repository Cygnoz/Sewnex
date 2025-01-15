import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Sale = lazy(() => import("../pages/Sales")); 
 
const SaleRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Sale/>}></Route>
      
      </Routes>
    );
  };
  

export default SaleRoutes;
