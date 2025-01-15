import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Order = lazy(() => import("../pages/Order")); 
 
const OrderRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Order/>}></Route>
      </Routes>
    );
  };
  

export default OrderRoutes;
