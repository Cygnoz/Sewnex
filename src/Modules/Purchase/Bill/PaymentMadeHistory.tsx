import { useState } from "react";
import CheveronDown from "../../../assets/icons/CheveronDown";
import NewsPaper from "../../../assets/icons/NewsPaper";
import Rupee from "../../../assets/icons/Rupee";
import User from "../../../assets/icons/User";
import Polygon from "../../../assets/icons/Polygon";

type Props = {};

const PaymentMadeHistory = ({}: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  const billData = [
    {
      icon: NewsPaper,
      title: "Bill No",
      content: "001",
      color: "#FAF2E6",
      textColor: "#495160",
      iconColor:"#054928"
    },
    {
      icon: User,
      title: "Supplier Name",
      content: "Dheeraj",
      color: "#FAF2E6",
      textColor: "#495160",
    },
    {
      icon: Rupee,
      title: "Order Amount",
      content: "5000",
      color: "#FAF2E6",
      textColor: "#495160",
    },
    {
      icon: Rupee,
      title: "Outstanding Balance",
      content: "50000",
      color: "#EAECF0",
      textColor: "#495160",
    },
    {
      icon: User,
      title: "Total Paid",
      content: "5000",
      color: "#004D4D",
      iconColor: "#E6EDED",
      textColor: "#F9F9F9",
    },
  ];

  const cardData = [
    {
      orderId: "565478",
      Paid: "200",
      balance: "200",
      date: "May 10 2025",
      time: "10:30 PM",
    },
    {
      orderId: "565479",
      Paid: "150",
      balance: "150",
      date: "May 11 2025",
      time: "11:00 AM",
    },
    {
      orderId: "565480",
      Paid: "300",
      balance: "300",
      date: "May 12 2025",
      time: "12:45 PM",
    },
    {
      orderId: "565481",
      Paid: "450",
      balance: "450",
      date: "May 13 2025",
      time: "1:30 PM",
    },
    {
      orderId: "565482",
      Paid: "500",
      balance: "500",
      date: "May 14 2025",
      time: "2:15 PM",
    },
    {
      orderId: "565483",
      Paid: "350",
      balance: "350",
      date: "May 15 2025",
      time: "3:00 PM",
    },
    {
      orderId: "565484",
      Paid: "400",
      balance: "400",
      date: "May 16 2025",
      time: "4:30 PM",
    },
    {
      orderId: "565485",
      Paid: "250",
      balance: "250",
      date: "May 17 2025",
      time: "5:00 PM",
    },
  ];

  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <div className="border-[#E7E7ED] border rounded-lg text-sm p-5">
      <p className="text-sm font-bold text-text_tertiary">Payment Made</p>

      <div className="flex items-center justify-between gap-2">
        <div className="grid grid-cols-5 gap-4 my-4 flex-grow">
          {billData ? (
            billData.map((item) => (
              <div
                key={item.title}
                style={{ backgroundColor: item.color }}
                className="p-4 rounded-lg flex items-center justify-start gap-3"
              >
                <item.icon color={item.iconColor ? item.iconColor : ""} />
                <div>
                  <p className="text-xs" style={{ color: item.textColor }}>
                    {item.title}
                  </p>
                  <p
                    style={{ color: item.textColor }}
                    className="font-semibold"
                  >
                    {item.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        <button
          className={`flex-shrink-0 w-10 flex justify-center items-center transform transition-transform duration-300 ${
            expand ? "rotate-180" : ""
          }`}
          onClick={handleExpand}
        >
          <CheveronDown />
        </button>
      </div>

    { expand &&   <div>
        <div className="bg-[#DADBDD] h-[6.6px] -mb-3 rounded-lg "></div>
        <div className="flex gap-5 overflow-x-scroll hide-scrollbar w-full">
          {cardData.map((item) => (
            <div>
              <div className="bg-[#97998E] rounded-full h-5 w-5  flex items-center justify-center">
                <div className="border-[2px] border-[white] rounded-full  h-3 w-3 "></div>
              </div>
              <div>
                <div className="ms-2">
                  <Polygon />
                </div>

                <div className="bg-[#F6F6F6] rounded-lg px-4 py-2  min-w-60 h-24 text-xs text-text_tertiary space-y-1">
                  <div className="mb-2"> Order Id: {item.orderId}</div>
                  <div className="flex">
                    {" "}
                    <p>Paid </p>{" "}
                    <p className="ml-auto me-10 font-semibold">₹{item.Paid}</p>
                  </div>
                  <div className="flex">
                    {" "}
                    <p>Balance </p>{" "}
                    <p className="ml-auto me-10 font-semibold">
                      ₹{item.balance}
                    </p>
                  </div>
                  <div className="flex font-medium">
                    {" "}
                    <p>{item.date} </p>{" "}
                    <p className="ml-auto me-10 font-medium">{item.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export default PaymentMadeHistory;
