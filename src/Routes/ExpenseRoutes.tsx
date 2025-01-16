import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Expense = lazy(() => import("../pages/Expense")); 
 
const ExpenseRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Expense/>}></Route>
      
      </Routes>
    );
  };
  

export default ExpenseRoutes;
