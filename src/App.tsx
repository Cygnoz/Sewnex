import React, { lazy, Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import PurchaseRoutes from "./Routes/PurchaseRoutes";
import CustomerRoutes from "./Routes/CustomerRoutes";
import SettingsRoutes from "./Routes/SettingsRoutes";
import ItemMasterRoutes from "./Routes/ItemMasterRoutes";
import OrderRoutes from "./Routes/OrderRoutes";
import InternalOrderRoutes from "./Routes/InternalOrderRoutes";
import SaleRoutes from "./Routes/SaleRoutes";
import AccountsRoutes from "./Routes/AccountsRoutes";
import ExpenseRoutes from "./Routes/ExpenseRoutes";
import SupplierRoutes from "./Routes/SpplierRoutes";
import StaffRoutes from "./Routes/StaffRoutes";
import ReportRoutes from "./Routes/ReportRoutes";
import Login from "./pages/Login/Login";
import Otp from "./pages/Login/Otp";
import PosReceipt from "./pages/pos/PosReceipt";
import { useAuth } from "./Context/AuthContext";
import { OrganizationProvider } from "./Context/OrganizationContext";

const Layout = lazy(() => import("./layout/Layout"));
const Dashboard = lazy(() => import("./pages/DashBoard"));
const Pos = lazy(() => import("./pages/pos/Pos"));
const SettingsLayout = lazy(() => import("./layout/Settings/SettingsLayout"));

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const routes = [
    {
      path: "/",
      element: isAuthenticated ? <Layout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "purchase/*", element: <PurchaseRoutes /> },
        { path: "customer/*", element: <CustomerRoutes /> },
        { path: "itemhub/*", element: <ItemMasterRoutes /> },
        { path: "order/*", element: <OrderRoutes /> },
        { path: "internalOrder/*", element: <InternalOrderRoutes /> },
        { path: "sales/*", element: <SaleRoutes /> },
        { path: "accountant/*", element: <AccountsRoutes /> },
        { path: "expense/*", element: <ExpenseRoutes /> },
        { path: "supplier/*", element: <SupplierRoutes /> },
        { path: "staffs/*", element: <StaffRoutes /> },
        { path: "report/*", element: <ReportRoutes /> },  
      ],
    },
    {
      path: "/",
      element: isAuthenticated ? <SettingsLayout /> : <Navigate to="/login" />,
      children: [
        { path: "", element: <div></div> },
        { path: "settings/*", element: <SettingsRoutes /> },
      ],
    },
    {
      path: "/pos",
      element: isAuthenticated ? <Pos /> : <Navigate to="/login" />,
    },
    {
      path: "/posreciept",
      element: isAuthenticated ? <PosReceipt /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/otp",
      element: isAuthenticated ? <Navigate to="/" /> : <Otp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <div>Error</div>,
    },
  ];

  const element = useRoutes(routes);

  return (
   <OrganizationProvider>
      <Suspense
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }
      >
        {element}
      </Suspense>
   </OrganizationProvider>
  );
};

export default App;