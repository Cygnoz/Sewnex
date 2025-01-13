import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ItemHub from "./pages/ItemHub";
import DashBoard from "./pages/DashBoard";
import Report from "./pages/Report";
import Accounts from "./pages/Accounts";
import Order from "./pages/Order";
import InternalOrder from "./pages/InternalOrder";
import Customer from "./pages/Customer";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import Expense from "./pages/Expense";
import Supplier from "./pages/Supplier";
import Staffs from "./pages/Staffs";
import Settings from "./pages/Settings";
import Pos from "./pages/pos/Pos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashBoard />} />
        <Route path="itemHub" element={<ItemHub />} />
        <Route path="report" element={<Report />} />
        <Route path="accountant" element={<Accounts />} />
        <Route path="order" element={<Order />} />
        <Route path="internalOrder" element={<InternalOrder />} />
        <Route path="customer" element={<Customer />} />
        <Route path="sales" element={<Sales />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="expense" element={<Expense />} />
        <Route path="supplier" element={<Supplier />} />
        <Route path="staffs" element={<Staffs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/pos" element={<Pos/>}></Route>
    </Routes>
  );
}

export default App;
