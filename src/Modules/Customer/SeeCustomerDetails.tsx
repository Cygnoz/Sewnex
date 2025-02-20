import CardSkeleton from "../../Components/CardsSKeleton"
import orderDoneImage from "../../assets/images/OrderDoneImage.png"
import TotalSalesImage from "../../assets/images/TotalSalesImage.png"
import TotalRevenueOrderImage from "../../assets/images/TotalRevenueOrderImage.png"
import TotalRevenueSalesImage from "../../assets/images/TotalRevenueSalesImage.png"
import BgCard from "../../assets/images/BgCard.jpg"
import CustomerProfile from "../../assets/images/CustomerProfile.png"
import Info from "../../assets/icons/Info"
import SquereScissorIcon from "../../assets/icons/SquereScissorIcon"
import History from "../../assets/icons/History"
import LineChart from "../../assets/icons/LineChart"
import NewsPaperIcon from "../../assets/icons/NewsPaperIcon"
import { useEffect, useState } from "react"
import Overview from "./Overview"
import ItemMeasurement from "./ItemMeasurement"
import OrderHistory from "./OrderHistory"
import ViewPayment from "./ViewPayment"
import { Link, useParams } from "react-router-dom"
import ChevronLeft from "../../assets/icons/ChevronLeft"
import SalesHistory from "./SalesHistory"
import useApi from "../../Hooks/useApi"
import { endpoints } from "../../Services/apiEdpoints"
import toast from "react-hot-toast"
interface CardData {
  icon: string;
  title: string;
  count: string;
}

const SeeCustomerDetails = () => {

  const [selectedTab, setSelectedTab] = useState("Overview");


  const [customerData, setCustomerdata] = useState<any>([]);
  const { request: customer } = useApi("get", 5002);

  const { id } = useParams();

  const getOne = async () => {
    try {
      const url = `${endpoints.GET_ONE_CUSTOMER}/${id}`;
      const { response, error } = await customer(url);
      if (!error && response) {
        setCustomerdata(response.data);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  };

  useEffect(() => {
    getOne();
  }, []);








  const sideBarHead = [
    { icon: <Info />, title: "Overview", onclick: () => setSelectedTab("Overview") },
    { icon: <SquereScissorIcon />, title: "Item Measurement", onclick: () => setSelectedTab("Item Measurement") },
    { icon: <LineChart />, title: "Sales History", onclick: () => setSelectedTab("Sales History") },
    { icon: <History />, title: "Order History", onclick: () => setSelectedTab("Order History") },
    { icon: <NewsPaperIcon />, title: "View Payment", onclick: () => setSelectedTab("View Payment") },

  ];

  const cards: CardData[] = [
    {
      icon: orderDoneImage,
      title: "Total Number Of Orders",
      count: "05",
    },
    {
      icon: TotalSalesImage,
      title: "Total Number Of Sales",
      count: "12",
    },
    {
      icon: TotalRevenueOrderImage,
      title: "Total Revenue (Orders)",
      count: "$1,500",
    },
    {
      icon: TotalRevenueSalesImage,
      title: "Total Revenue (Sales)",
      count: "$1,500",
    },
    {
      icon: TotalRevenueSalesImage,
      title: "Opening Balance",
      count: "$1,500",
    },
    {
      icon: TotalRevenueSalesImage,
      title: "Outstanding Balance",
      count: "$1,500",
    },

  ]
  return (
    <div>
      <div className="flex">
        <Link to={"/customer"}>
          <div
            style={{ borderRadius: "50%" }}
            className="w-[40px] h-[40px] object-cover  flex items-center justify-center bg-backButton"
          >
            <ChevronLeft color="#0F172A"  />
          </div>
        </Link>
        <p className="text-[#0B1320] text-[16px] mx-2 mt-1.5  font-bold">Customer Overview</p>

      </div>
      <div className="mt-2 flex mx-3  bg-white rounded-lg p-5">
        {/* 1st card */}
        <div
          className="relative w-[300px] h-[150px] rounded-2xl p-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${BgCard})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#004D4D] to-[#0CA65B] opacity-5 rounded-2xl"></div>
          <div className="relative z-10">
            <p className="text-membershipText text-sm whitespace-nowrap  text-[#E8E8E8] mt-1">
              Privilege Membership Card
            </p>
            <div className=" items-center mt-3">
              <img
                  src={customerData.customerProfile ? customerData.customerProfile : CustomerProfile}
                alt="Profile"
                className="w-8 h-8 object-cover rounded-full mr-3"
              />

              <div>
                <p className="text-[#E8E8E8] text-sm font-semibold mt-1 whitespace-nowrap">
                  {customerData?.customerDisplayName}
                  
                </p>
                <p className="text-membershipText text-[#E8E8E8] text-xs mt-1">
                  {customerData.mobile}

                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd card */}
        <div className="flex mx-6 w-full gap-6 ">
          {
            cards.length > 0
              ? cards.map((card) => (
                <div className=" p-5 w-[145px] h-[150px]  bg-[#F5F8FC] rounded-[20px] ">
                  <img className="w-8 h-8" src={card.icon} alt="" />
                  <h1 className="text-[#4B5C79] text-sm font-semibold my-2">{card.title}</h1>
                  <h1>{card.count}</h1>
                </div>

              ))
              :
              Array.from({ length: 3 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}

        </div>
      </div>

      <div className="gap-6 bg-white p-2 my-2 rounded-2xl">
        <div className="flex max-w-full">
          {sideBarHead.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg w-full text-center my-2 px-3 text-sm py-1.5 cursor-pointer ${selectedTab === item.title ? "bg-[#F7E7CE]" : "bg-white"
                }`}
              onClick={item.onclick}
            >
              <div className="flex items-center justify-center space-x-2 py-.05"> {/* Flexbox to align horizontally */}
                {/* Render the icon */}
                <span className="text-xl">{item.icon}</span> {/* Adjust icon size if needed */}
                <p className="text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="col-span-9">
          {/* Pass the required props to the Overview component */}
          {selectedTab === "Overview" && (
            <Overview
            customerData={customerData}
            // statusData={statusData}
            // customerId={customerId}
            // handleStatusSubmit={handleStatusSubmit}
            />
          )}
          {selectedTab === "Item Measurement" && (
            <ItemMeasurement />
          )}
          {selectedTab === "Order History" && (
            <OrderHistory />
          )}
          {selectedTab === "View Payment" && (
            <ViewPayment />
          )}
           {selectedTab === "Sales History" && (
            <SalesHistory/>
          )}
        </div>






      </div>





    </div>
  )
}

export default SeeCustomerDetails