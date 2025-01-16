import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Accounts = lazy(() => import("../pages/Accounts")); 
 
const AccountsRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Accounts/>}></Route>
      
      </Routes>
    );
  };
  

export default AccountsRoutes;
