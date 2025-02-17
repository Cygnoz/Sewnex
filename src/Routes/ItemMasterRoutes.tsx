import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ItemHub = lazy(() => import("../pages/ItemHub")); 
const ServicesHome = lazy(() => import("../Modules/itemHub/itemServices/ServicesHome")); 
 
const ItemMasterRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ItemHub/>}></Route>
        <Route path="/services" element={<ServicesHome/>}></Route>
      
      </Routes>
    );
  };
  

export default ItemMasterRoutes;
