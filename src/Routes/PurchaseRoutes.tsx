import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Purchaseview from "../Modules/Purchase/CommonComponents/PurchaseView/PurchaseView";
import NewPayment from "../Modules/Purchase/PaymentMade/NewPayment";
import PaymentView from "../Modules/Purchase/PaymentMade/PaymentView/PaymentView";
import NewDebitNote from "../Modules/Purchase/DebitNote/NewDebitNote";

// const Purchase = lazy(() => import("../pages/Purchase"));
const Bills = lazy(() => import("../Modules/Purchase/Bill/Bills"));
const PaymentMade = lazy(() => import("../Modules/Purchase/PaymentMade/PaymentMade"));
const DebitNote = lazy(() => import("../Modules/Purchase/DebitNote/DebitNote"));
const NewBill = lazy(() => import("../Modules/Purchase/Bill/NewBill"));


 
const PurchaseRoutes = () => {
    return (
      <Routes>
        {/* <Route path="/" element={<Purchase/>}></Route> */}
        <Route path="bills" element={<Bills />} />
        <Route path="payment-made" element={<PaymentMade />} />
        <Route path="debitnote" element={<DebitNote />} />
        <Route path="bills/new" element={<NewBill/>} />
        <Route path="bills/view/id" element={<Purchaseview page="Bills"/>} />
        <Route path="payment-made/new" element={<NewPayment/>} />
        <Route path="payment-made/view" element={<PaymentView/>} />
        <Route path="debitnote/new" element={<NewDebitNote />} />


      </Routes>
    );
  };
  

export default PurchaseRoutes;
