import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ItemHub = lazy(() => import("../pages/ItemHub")); 
const ServicesHome = lazy(() => import("../Modules/itemHub/itemServices/ServicesHome")); 
const RetailProduct = lazy(()=>import("../Modules/itemHub/ItemProduct/RetailProduct"))
 
const ItemMasterRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ItemHub/>}></Route>
        <Route path="/services" element={<ServicesHome/>}></Route>
        <Route path="/products" element={<RetailProduct/>}></Route>

      
      </Routes>
    );
  };
  

export default ItemMasterRoutes;
