import HomeIcon from "../icons/HomeIcon";
import ShirtIcon from "../icons/ShirtIcon";
import CartIcon from "../icons/CartIcon";
import ListIcon from "../icons/ListIcon";
import UserIcon from "../icons/UserIcon";
import BarChartIcon from "../icons/BarChartIcon";
import PosIcon from "../icons/PosIcon";
import ShoppingBarIcon from "../icons/ShoppingBarIcon";
import SquarUserIcon from "../icons/SquarUserIcon";
import WalletIcon from "../icons/WalletIcon";
import TruckIcon from "../icons/TruckIcon";
import TwoUserIcon from "../icons/TwoUserIcon";
import SettingsIcon from "../icons/SettingsIcon";
import NewsPaperIcon from "../icons/NewsPaperIcon";

export const navList = [
  {
    nav: "Dashboard",
    icon: HomeIcon,
    route: "/",
  },
  {
    nav: "Item hub",
    icon: ShirtIcon,
    route: "/itemHub",
  },
  {
    nav: "Order",
    icon: CartIcon,
    route: "/order",
  },
  {
    nav: "Internal Order",
    icon: ListIcon,
    route: "/internalOrder",
  },
  {
    nav: "Customer",
    icon: UserIcon,
    route: "/customer",
  },
  {
    nav: "Sales",
    icon: BarChartIcon,
    route: "/sales/invoice",
    subhead: [
      {
        headName: "Invoice",
        subRoute: "/sales/invoice",
      },
      {
        headName: "Receipt",
        subRoute: "/sales/receipt",
      },
      {
        headName: "Sales Return",
        subRoute: "/sales/salesreturn",
      },
      {
        headName: "Credit Note",
        subRoute: "/sales/credit-note",
      },
    ],
  },
  {
    nav: "POS",
    icon: PosIcon,
    route: "/pos",
  },
  {
    nav: "Purchase",
    icon: ShoppingBarIcon,
    route: "/purchase/bills",
    subhead:[
      {
        headName: "Bills",
        subRoute: "/purchase/bills",
      },
      {
        headName: "Payment Made",
        subRoute: "/purchase/payment-made",
      },
      {
        headName: "Debit Note",
        subRoute: "/purchase/debitnote",
      },
    ]
  },
  {
    nav: "Accountant",
    icon: SquarUserIcon,
    route: "/accountant",
    subhead: [
      {
        headName: "Chart Of Account",
        subRoute: "/accountant",
      },
      {
        headName: "Manual Journals",
        subRoute: "/accountant/manualjournal",
      },
      {
        headName: "Bank",
        subRoute: "/accountant/bank",
      },
      {
        headName: "Cash",
        subRoute: "/accountant/cash",
      },
      // {
      //   headName: "Day Book",
      //   subRoute: "/accountant/daybook",
      // },
    ],
  },
  {
    nav: "Expense",
    icon: WalletIcon,
    route: "/expense",
  },
  {
    nav: "Supplier",
    icon: TruckIcon,
    route: "/supplier",
  },
  {
    nav: "Staffs",
    icon: TwoUserIcon,
    route: "/staffs",
  },
  {
    nav: "Settings",
    icon: SettingsIcon,
    route: "/settings",
  },
  {
    nav: "Report",
    icon: NewsPaperIcon,
    route: "/report",
  },
];
