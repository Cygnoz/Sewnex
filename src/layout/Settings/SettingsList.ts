export const settingsList = [
    {
      nav: "Organization",
      icon: "",
      subhead: [
        { headName: "Profile", subRoute: "/settings/organization/profile" },
        { headName: "Currencies", subRoute: "/settings/organization/currencies" },
        // {headName:"Accounts",subRoute:"/settings/organization/accounts"},
        {
          headName: "Additional Details",
          subRoute: "/settings/organization/invoice",
        },
      ],
    },
    {
      nav: "Items",
      icon: "",
      subhead: [
        { headName: "Item", subRoute: "/settings/items/item" },
        {
          headName: "Inventory Adjustment",
          subRoute: "/settings/inventory-adjustment",
        },
      ],
    },
    {
      nav: "Tax & Compliance",
      icon: "",
      subhead: [
        { headName: "Taxes", subRoute: "/settings/taxes" },
        { headName: "MSME Settings", subRoute: "/settings/taxes/msme" },
      ],
    },
    {
      nav: "Rewards Settings",
      icon: "",
      subhead: [
        { headName: "Rewards", subRoute: "/settings/rewards" },
        { headName: "Refer & Earn", subRoute: "/settings/rewards/refferandearn" },
        {
          headName: "Membership Card",
          subRoute: "/settings/rewards/membershipcard",
        },
      ],
    },
    {
      nav: "Sales",
      icon: "",
      subhead: [
        { headName: "Sales Order", subRoute: "/settings/sales/salesOrder" },
        { headName: "Shipments", subRoute: "/settings/sales/shipments" },
        { headName: "Invoices", subRoute: "/settings/sales/invoices" },
        {
          headName: "Delivery Challans",
          subRoute: "/settings/sales/deliverychallans",
        },
        { headName: "Credit Notes", subRoute: "/settings/sales/CreditNotes" },
      ],
    },
  
    {
      nav: "Purchases",
      icon: "",
      subhead: [
        {
          headName: "Purchase Orders",
          subRoute: "/settings/purchase/puschaseOrder",
        },
        { headName: "Expense", subRoute: "/settings/purchases/expenses" },
      ],
    },
    {
      nav: "Customization",
      icon: "",
      subhead: [
        { headName: "Reporting Tags", subRoute: "/settings/reporting-tags" },
        { headName: "Web Tabs", subRoute: "/settings/web-tabs" },
        {
          headName: "Digital Signature",
          subRoute: "/settings/digital-signature",
        },
        {
          headName: "Transaction Number Series",
          subRoute: "/settings/transaction-number-series",
        },
        { headName: "PDF Templates", subRoute: "/settings/pdf-templates" },
      ],
    },
    {
      nav: "Users & Roles",
      icon: "",
      subhead: [
        { headName: "Users", subRoute: "/settings/users" },
        { headName: "Roles", subRoute: "/settings/roles" },
        { headName: "User Preferences", subRoute: "/settings/user-preferences" },
      ],
    },
    {
      nav: "Preferences",
      icon: "",
      subhead: [
        { headName: "General", subRoute: "/settings/general" },
        {
          headName: "Customer & Supplier",
          subRoute: "/settings/preferences/CustomerAndSupplier",
        },
        { headName: "Accountant", subRoute: "/settings/accountant" },
        { headName: "Projects", subRoute: "/settings/projects" },
        { headName: "Timesheets", subRoute: "/settings/timesheets" },
        { headName: "Customer Portal", subRoute: "/settings/customer-portal" },
        { headName: "Vendor Portal", subRoute: "/settings/vendor-portal" },
      ],
    },
    {
      nav: "Reminder & Notification",
      icon: "",
      subhead: [
        { headName: "Reminders", subRoute: "/settings/reminders" },
        {
          headName: "Email Notification",
          subRoute: "/settings/email-notification",
        },
        { headName: "SMS Notification", subRoute: "/settings/sms-notification" },
      ],
    },
    {
      nav: "Online Payments",
      icon: "",
      subhead: [
        {
          headName: "Customer Payments",
          subRoute: "/settings/customer-payments",
        },
        { headName: "Vendor Payments", subRoute: "/settings/vendor-payments" },
      ],
    },
  ];