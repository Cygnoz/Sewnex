import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const InternalOrder = lazy(() => import("../pages/InternalOrder")); 
 
const InternalOrderRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<InternalOrder/>}></Route>
      
      </Routes>
    );
  };
  

export default InternalOrderRoutes;
