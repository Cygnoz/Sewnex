import { lazy } from "react";
import { Route, Routes } from "react-router-dom";


const Expense = lazy(() => import("../pages/Expense")); 
 const AddExpensePage = lazy(() => import("../Modules/Expense/AddExpensePage"));
const ExpenseView = lazy(() => import("../Modules/Expense/ExpenseView"));
const ExpenseRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Expense/>}></Route>
        <Route path="add-expense" element={<AddExpensePage/>}></Route>
        <Route path="view" element={<ExpenseView/>}></Route>
      
      </Routes>
    );
  };
  

export default ExpenseRoutes;
