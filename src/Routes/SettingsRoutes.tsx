import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import GSTComponent from "../Modules/Settings/TaxesAndCompliances/gst/GSTComponent";
import VATComponent from "../Modules/Settings/TaxesAndCompliances/vat/VATComponent";
import OrderSettings from "../Modules/Settings/Orders/OrderSettings";

const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../Modules/Settings/Organization/Profile"));
const Currencies = lazy(() => import("../Modules/Settings/Organization/Currencies"));
const Invoice = lazy(() => import("../Modules/Settings/Organization/InvoiceINOrg"));
const Item = lazy(() => import("../Modules/Settings/Items/Items"));
const Taxes = lazy(() => import("../Modules/Settings/TaxesAndCompliances/Taxes"));
const MSMESettings = lazy(() => import("../Modules/Settings/TaxesAndCompliances/MSMESettings"));
const CustomerVendor = lazy(() => import("../Modules/Settings/Preferences/CustomerAndVendor"));
const Rewards = lazy(() => import("../Modules/Settings/RewardSettings/Rewards"));
const ReferEarn = lazy(() => import("../Modules/Settings/RewardSettings/Rewards"));
const MembershipCard = lazy(() => import("../Modules/Settings/RewardSettings/MembershipCard"));
const SalesOrder = lazy(() => import("../Modules/Settings/Sale/SalesOrder"));
const Shipments = lazy(() => import("../Modules/Settings/Sale/Shipments"));
const Invoices = lazy(() => import("../Modules/Settings/Sale/Invoices"));
const DeliveryChallans = lazy(() => import("../Modules/Settings/Sale/DeliveryChallans"));
const CreditNotes = lazy(() => import("../Modules/Settings/Sale/CreditNotes"));
const PurchaseOrders = lazy(() => import("../Modules/Settings/Purchases/PurchaseOrders"));
const Expense = lazy(() => import("../Modules/Settings/Purchases/Expense"));
const TransactionNumberSeries = lazy(() => import("../Modules/Settings/Customization/TransactionNumberSeries"));

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Settings />}></Route>
      <Route path="/organization/profile" element={<Profile />}></Route>
      <Route path="/organization/currencies" element={<Currencies />}></Route>
      <Route path="/organization/invoice" element={<Invoice />}></Route>
      <Route path="/items/item" element={<Item />}></Route>
x      <Route path="/preferences/customer-vendor" element={<CustomerVendor />}></Route>
      <Route path="/rewards-settings/rewards" element={<Rewards />}></Route>
      <Route path="/rewards-settings/refer-earn" element={<ReferEarn />}></Route>
      <Route path="/rewards-settings/membership-card" element={<MembershipCard />}></Route>
      <Route path="/sales/sales-order" element={<SalesOrder />}></Route>
      <Route path="/sales/shipments" element={<Shipments />}></Route>
      <Route path="/sales/invoices" element={<Invoices />}></Route>
      <Route path="/sales/delivery-challans" element={<DeliveryChallans />}></Route>
      <Route path="/sales/credit-notes" element={<CreditNotes />}></Route>
      <Route path="/purchases/purchase-orders" element={<PurchaseOrders />}></Route>
      <Route path="/purchases/expense" element={<Expense />}></Route>
      <Route path="/customization/transaction-number-series" element={<TransactionNumberSeries />}></Route>

      <Route path="/tax-compliance/taxes" element={<Taxes />}></Route>
      <Route path="/tax-compliance/msme-settings" element={<MSMESettings />}></Route>
      <Route path="/tax-compliance/GST" element={<GSTComponent />}></Route>
      <Route path="/tax-compliance/VAT" element={<VATComponent />}></Route>

      <Route path="/orders/ordersettings" element={<OrderSettings/>}></Route>
    </Routes>
  );
};

export default SettingsRoutes;