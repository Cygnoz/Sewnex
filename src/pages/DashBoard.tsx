import CartIcon from "../assets/icons/CartIcon"
import DollarSign from "../assets/icons/Dollarsign"
import MoneySackIcon from "../assets/icons/MoneySackIcon"
import PieChartIcon from "../assets/icons/PieChartIcon"
import SewMachineIcon from "../assets/icons/SewMachineIcon"
import SkirtIcon from "../assets/icons/SkirtIcon"
import DashboardTruck from "../assets/icons/DashboardTruck"
import card1line from "../assets/images/card1lines.png"
import card7line from "../assets/images/card7lines.png"
import MetricCard from "../Components/MetricCard"
import card6img from "../assets/images/card6img.png"
import { useState } from "react"
import BarChart from "../assets/icons/BarChart"
import TruckIcon2 from "../assets/icons/TruckIcon2"
import BoxIcon from "../assets/icons/BoxIcon"
import StatusIcon from "../assets/icons/StatusIcon"
import Table from "../Components/Table/Table"
import RecentServices from "../Components/RecentServices"
// import birthdaycard1img from "../assets/images/birthdaycard1img.png"
// import Ellipse45 from "../assets/images/Ellipse 45.png"
// import Ellipse46 from "../assets/images/Ellipse 46.png"
// import Ellipse47 from "../assets/images/Ellipse 47.png"
// import Ellipse48 from "../assets/images/Ellipse 48.png"
import CustomerBirthdayCard from "../Modules/Dashboard/CustomerBirthdayCard"
import StaffBirthdayCard from "../Modules/Dashboard/StaffBirthdayCard"

const metrics = [
  {
    title: "Today's income",
    value: "Rs 550,000",
    icon: DollarSign,
    className: "bg-[#004D4D] text-white",
    backgroundImage: card1line,
  },
  {
    title: "Today's order",
    value: "257",
    icon: CartIcon,
    iconClassName: "bg-white",
    className: "bg-custom-gradient text-emerald-900",
  },
  {
    title: "Todays Trail",
    value: "80",
    icon: SkirtIcon,
    iconClassName: "bg-custom-gradient",
    className: "bg-cus text-stone-900",
  },
  {
    title: "Today's Stitching Revenue",
    value: "Rs 50,000",
    icon: SewMachineIcon,
    className: "bg-[#F7ECD9] text-amber-900",
  },
  {
    title: "Todays expense",
    value: "Rs 50,000",
    icon: MoneySackIcon,
    className: "bg-[#E6EDED] text-slate-900",
  },
  {
    title: "Today's Delivery",
    value: "49",
    icon: DashboardTruck,
    className: "bg-blue-50 text-blue-900 col-span-1",
    backgroundImage: card6img,
    backgroundHeight: "10px",
  },
  {
    title: "Today's sales revenue",
    value: "Rs 350,000",
    icon: PieChartIcon,
    className: "bg-[#0B9C56] text-white col-span-2",
    backgroundImage: card7line,
  },
]

const dummyColumns = [
  { id: "id", label: "ID", visible: true },
  { id: "name", label: "Name", visible: true },
  { id: "email", label: "Email", visible: true },
  { id: "role", label: "Role", visible: true },
]

const dummyData = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: "3", name: "Bob Brown", email: "bob@example.com", role: "Viewer" },
  { id: "4", name: "Alice Green", email: "alice@example.com", role: "Admin" },
  { id: "5", name: "Tom White", email: "tom@example.com", role: "Editor" },
]

const dummyServices = [
  {
    id: 1,
    image: "/api/placeholder/48/48",
    serviceType: "Service",
    productName: "Casual Pant",
    quantity: 1,
    price: 999.0,
  },
  {
    id: 2,
    image: "/api/placeholder/48/48",
    serviceType: "Service",
    productName: "Linen Shirt",
    quantity: 2,
    price: 3526.0,
  },
  {
    id: 3,
    image: "/api/placeholder/48/48",
    serviceType: "Service",
    productName: "Black T-shirt",
    quantity: 1,
    price: 1230.0,
  },
  {
    id: 4,
    image: "/api/placeholder/48/48",
    serviceType: "Service",
    productName: "Denim Jeans",
    quantity: 1,
    price: 2499.0,
  },
  {
    id: 5,
    image: "/api/placeholder/48/48",
    serviceType: "Service",
    productName: "Cotton Dress",
    quantity: 1,
    price: 1899.0,
  },
  {
    id: 6,
    image: "/api/placeholder/48/48",
    serviceType: "Service",
    productName: "Formal Blazer",
    quantity: 1,
    price: 4999.0,
  },
]

// const avatarImages = [Ellipse45, Ellipse46, Ellipse47, Ellipse48]

// const TableDemo = () => {
//   const handleRowClick = (id:string) => {
//     console.log(`Row clicked with ID: ${id}`);
//   };

//   const handleEditClick = (id:string) => {
//     console.log(`Edit clicked for ID: ${id}`);
//   };

//   const handleDelete = (id:string) => {
//     console.log(`Delete clicked for ID: ${id}`);
//   };

//   const renderColumnContent = (colId: string, item: { [key: string]: any }) => {
//     if (colId === "role") {
//       return <span style={{ color: item.role === "Admin" ? "red" : "green" }}>{item.role}</span>;
//     }
//     return item[colId];
//   };
// }

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Stitching Order")

  return (
    <div>
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} title={metric.title} value={metric.value} icon={metric.icon} className={metric.className} backgroundImage={metric.backgroundImage} iconClassName={metric.iconClassName} />
        ))}
      </div>

      {/* tabs for stitching order, sales, todays delivery item delivery item status */}

      <div className="bg-[#FFFFFF] shadow-md rounded-[8px] flex p-2 justify-between items-center gap-4 mt-6 mx-auto w-full h-[50]">
        <button className={`flex items-center gap-3 px-5 py-3 rounded-md font-medium ${activeTab === "Stitching Order" ? "bg-[#EED8B0] h-[60px] shadow-lg" : "bg-white h-[56px]"}`} onClick={() => setActiveTab("Stitching Order")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3E8]">
            <CartIcon color="black" />
          </div>
          <div className="text-left">
            <span className="block font-semibold text-black text-sm">100</span>
            <span className="block text-gray-700 text-xs font-semibold">Stitching Order</span>
          </div>
        </button>

        <button className={`flex items-center gap-3 px-5 py-3 rounded-md font-medium ${activeTab === "Sales" ? "bg-[#EED8B0] h-[60px] shadow-lg" : "bg-white h-[56px]"}`} onClick={() => setActiveTab("Sales")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3E8]">
            <BarChart color="black" />
          </div>
          <div className="text-left">
            <span className="block font-semibold text-black text-sm">100</span>
            <span className="block text-gray-700 text-xs font-semibold">Sales</span>
          </div>
        </button>

        <button className={`flex items-center gap-3 px-5 py-3 rounded-md font-medium ${activeTab === "Today's Delivery" ? "bg-[#EED8B0] h-[60px] shadow-lg" : "bg-white h-[56px]"}`} onClick={() => setActiveTab("Today's Delivery")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3E8]">
            <TruckIcon2 />
          </div>
          <div className="text-left">
            <span className="block font-semibold text-black text-sm">90</span>
            <span className="block text-gray-700 text-xs font-semibold">Today's Delivery</span>
          </div>
        </button>

        <button className={`flex items-center gap-3 px-5 py-3 rounded-md font-medium ${activeTab === "Item Delivery" ? "bg-[#EED8B0] h-[60px] shadow-lg" : "bg-white h-[56px]"}`} onClick={() => setActiveTab("Item Delivery")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3E8]">
            <BoxIcon />
          </div>
          <div className="text-left">
            <span className="block font-semibold text-black text-sm">90</span>
            <span className="block text-gray-700 text-xs font-semibold">Item Delivery</span>
          </div>
        </button>

        <button className={`flex items-center gap-3 px-5 py-3 rounded-md font-medium ${activeTab === "Item Status" ? "bg-[#EED8B0] h-[60px] shadow-lg" : "bg-white h-[56px]"}`} onClick={() => setActiveTab("Item Status")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3E8]">
            <StatusIcon />
          </div>
          <div className="text-left">
            <span className="block font-semibold text-black text-sm">-</span>
            <span className="block text-gray-700 text-xs font-semibold">Item Status</span>
          </div>
        </button>
      </div>

      {/* <Table/> */}

      <div className="mt-6">
        <Table
          columns={dummyColumns}
          data={dummyData}
          searchPlaceholder="Search by Name or Email"
          searchableFields={["name", "email"]}
          loading={false}
          // page="OCR"
        />
      </div>

      {/* bottom sections */}

      <div className="mt-6">
        <h1 className="text-xl font-semibold mb-4">Recent Services</h1>
        <div className="flex w-full gap-4">
          {/* Left Section */}
          <div className="flex-1 p-4 gap-2 space-y-4 rounded-md">
            {dummyServices.map((service) => (
              <RecentServices key={service.id} {...service} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex-1 p-4 rounded-md">

            {/* customer birthday */}
          <CustomerBirthdayCard />

          {/* staff birthday */}
          <StaffBirthdayCard />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
