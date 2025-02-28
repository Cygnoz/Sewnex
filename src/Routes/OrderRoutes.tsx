import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Order = lazy(() => import("../pages/Order")); 
const AddOrder = lazy(() => import("../Modules/orderMaster/AddOrder")); 
 
const OrderRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Order/>}></Route>
        <Route path="newOrder" element={<AddOrder/>}></Route>
      </Routes>
    );
  };
  

export default OrderRoutes;
