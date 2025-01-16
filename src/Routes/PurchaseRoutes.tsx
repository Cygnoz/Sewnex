import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// const Purchase = lazy(() => import("../pages/Purchase"));
const Bills = lazy(() => import("../Modules/Purchase/Bill/Bills"));
const PaymentMade = lazy(() => import("../Modules/Purchase/PaymentMade/PaymentMade"));
const DebitNote = lazy(() => import("../Modules/Purchase/DebitNote/DebitNote"));

 
const PurchaseRoutes = () => {
    return (
      <Routes>
        {/* <Route path="/" element={<Purchase/>}></Route> */}
        <Route path="bills" element={<Bills />} />
        <Route path="payment-made" element={<PaymentMade />} />
        <Route path="debitnote" element={<DebitNote />} />
      </Routes>
    );
  };
  

export default PurchaseRoutes;
