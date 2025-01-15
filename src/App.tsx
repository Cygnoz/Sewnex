import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import PurchaseRoutes from "./Routes/PurchaseRoutes";
import CustomerRoutes from "./Routes/CustomerRoutes";
import SettingsRoutes from "./Routes/SettingsRoutes";
import ItemMasterRoutes from "./Routes/ItemMasterRoutes";
import OrderRoutes from "./Routes/OrderRoutes";
import InternalOrderRoutes from "./Routes/InternalOrderRoutes";
import SaleRoutes from "./Routes/SaleRoutes";

const Layout = lazy(() => import("./layout/Layout"));
const Dashboard = lazy(() => import("./pages/DashBoard"));
const Pos = lazy(() => import("./pages/pos/Pos"));
const SettingsLayout = lazy(() => import("./layout/Settings/SettingsLayout"));

const App: React.FC = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "purchase/*", element: <PurchaseRoutes /> },
        { path: "customer/*", element: <CustomerRoutes /> },
        { path: "itemhub/*", element: <ItemMasterRoutes /> },
        { path: "order/*", element: <OrderRoutes /> },
        { path: "internalOrder/*", element: <InternalOrderRoutes /> },
        { path: "sales/*", element: <SaleRoutes /> },
      ],
    },
    {
      path: "/",
      element: <SettingsLayout />, 
      children: [
        { path: "settings/*", element: <SettingsRoutes /> },
      ],
    },
    {
      path: "/pos",
      element: <Pos />,
    },
    {
      path: "/login",
      element: <div>Login Page</div>,
    },
    {
      path: "*",
      element: <div>Error</div>,
    },
  ];

  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div>
          <p>Loading...</p>
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

export default App;
