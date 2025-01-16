import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// const Sale = lazy(() => import("../pages/Sales")); 
const Inovice = lazy(() => import("../Modules/Sales/Invoice/Inovice")); 
const Receipt = lazy(() => import("../Modules/Sales/Receipt/Receipt")); 
const CreditNote = lazy(() => import("../Modules/Sales/CreditNote/CreditNote"));
const SalesReturn = lazy(() => import("../Modules/Sales/SalesReturn/SalesReturn"));


 
const SaleRoutes = () => {
    return (
      <Routes>
        {/* <Route path="/" element={<Sale/>}></Route> */}
        <Route path="/invoice" element={<Inovice/>}></Route>
        <Route path="/receipt" element={<Receipt/>}></Route>
        <Route path="/credit-note" element={<CreditNote/>}></Route>
        <Route path="/salesreturn" element={<SalesReturn/>}></Route>
      </Routes>
    );
  };
  

export default SaleRoutes;
