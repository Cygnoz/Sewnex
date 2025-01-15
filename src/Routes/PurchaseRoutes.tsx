import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Purchase = lazy(() => import("../pages/Purchase")); // Parent component for /purchase
const PurchaseOrder = lazy(() => import("../Components/PurchaseOrder")); // Component for /purchase/purchase-order
 
const PurchaseRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Purchase/>}></Route>
        <Route path="purchase-order" element={<PurchaseOrder />} />
        {/* Add more nested routes as needed */}
      </Routes>
    );
  };
  

export default PurchaseRoutes;
