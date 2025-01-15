import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ItemHub = lazy(() => import("../pages/ItemHub")); 
 
const ItemMasterRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ItemHub/>}></Route>
      
      </Routes>
    );
  };
  

export default ItemMasterRoutes;
