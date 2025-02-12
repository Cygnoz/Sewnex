import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Accounts = lazy(() => import("../pages/Accounts")); 
const BankHome = lazy(() => import("../Modules/accountant/Bank/BankHome")); 
const CashHome = lazy(() => import("../Modules/accountant/cash/CashHome")); 
const DayBookTable = lazy(() => import("../Modules/accountant/dayBook/DayBookTable")); 
const ManualJournalHome = lazy(() => import("../Modules/accountant/manualJournal/ManualJournalHome")); 
const AccountantViewOne = lazy(() => import("../Modules/accountant/AccountantViewOne")); 
const NewJournal = lazy(() => import("../Modules/accountant/manualJournal/newJournal/NewJournal")); 
const ManualJournalView = lazy(() => import("../Modules/accountant/manualJournal/ManualJournalView")); 
 
const AccountsRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Accounts/>}></Route>
        <Route path="bank" element={<BankHome/>}></Route>
        <Route path="cash" element={<CashHome/>}></Route>
        <Route path="dayBook" element={<DayBookTable/>}></Route>
        <Route path="manualJournal" element={<ManualJournalHome/>}></Route>
        <Route path="newJournal" element={<NewJournal/>}></Route>
        <Route path="editjournal/:id" element={<NewJournal page="edit"/>}></Route>
        <Route path="viewOne/:id" element={<AccountantViewOne/>}></Route>
        <Route path="viewOneJournal/:id" element={<ManualJournalView/>}></Route>
      </Routes>
    );
  };
  

export default AccountsRoutes;
