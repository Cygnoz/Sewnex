import BarChart from "../../assets/icons/BarChart";
import Building from "../../assets/icons/Building";
import Frame from "../../assets/icons/Frame";
import ListFilter from "../../assets/icons/ListFilter";
import Paint from "../../assets/icons/Paint";
import ShoppingBag from "../../assets/icons/ShoppingBag";
import WalletIcon from "../../assets/icons/WalletIcon";

export const settingsList = [
    {
      nav: "Organization",
      icon: Building,
      subhead: [
        { headName: "Profile", subRoute: "/settings/organization/profile" },
        { headName: "Currencies", subRoute: "/settings/organization/currencies" },
        // {headName:"Accounts",subRoute:"/settings/organization/accounts"},
        {
          headName: "Invoice",
          subRoute: "/settings/organization/invoice",
        },
      ],
    },
    {
      nav: "Items",
      icon: Frame,
      subhead: [
        { headName: "Item", subRoute: "/settings/items/item" },
       
      ],
    },
    {
      nav: "Tax & Compliance",
      icon: Building,
      subhead: [
        { headName: "Taxes", subRoute: "/settings/tax-compliance/taxes" },
        { headName: "MSME Settings", subRoute: "/settings/tax-compliance/msme-settings" },
      ],
    },
    {
      nav: "Preferences",
      icon: ListFilter,
      subhead: [
     
        {
          headName: "Customer & Vendor",
          subRoute: "/settings/preferences/customer-vendor",
        },
      
      ],
    },
    {
      nav: "Rewards Settings",
      icon: WalletIcon,
      subhead: [
        { headName: "Rewards", subRoute: "/settings/rewards-settings/rewards" },
        { headName: "Refer & Earn", subRoute: "/settings/rewards-settings/refer-earn" },
        {
          headName: "Membership Card",
          subRoute: "/settings/rewards-settings/membership-card",
        },
      ],
    },
    {
      nav: "Sales",
      icon: BarChart,
      subhead: [
        { headName: "Sales Order", subRoute: "/settings/sales/sales-order" },
        { headName: "Shipments", subRoute: "/settings/sales/shipments" },
        { headName: "Invoices", subRoute: "/settings/sales/invoices" },
        {
          headName: "Delivery Challans",
          subRoute: "/settings/sales/delivery-challans",
        },
        { headName: "Credit Notes", subRoute: "/settings/sales/Credit-notes" },
      ],
    },
  
    {
      nav: "Purchases",
      icon: ShoppingBag,
      subhead: [
        {
          headName: "Purchase Orders",
          subRoute: "/settings/purchases/purchase-orders",
        },
        { headName: "Expense", subRoute: "/settings/purchases/expense" },
      ],
    },
    {
      nav: "Customization",
      icon: Paint,
      subhead: [
     
        {
          headName: "Transaction Number Series",
          subRoute: "/settings/customization/transaction-number-series",
        },
      ],
    }
  ];