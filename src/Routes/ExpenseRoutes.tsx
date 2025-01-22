import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NewExpense from "../Modules/Expense/NewExpense";
import ExpenseView from "../Modules/Expense/ExpenseView";

const Expense = lazy(() => import("../pages/Expense")); 
 
const ExpenseRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Expense/>}></Route>
        <Route path="add-expense" element={<NewExpense/>}></Route>
        <Route path="view" element={<ExpenseView/>}></Route>
      
      </Routes>
    );
  };
  

export default ExpenseRoutes;
