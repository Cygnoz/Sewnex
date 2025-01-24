import ArrowRight from "../assets/icons/ArrowRight";
import building from "../assets/icons/Building";
import itemIcon from "../assets/icons/Frame";
import prefIcon from "../assets/icons/ListFilter";
import RewardIcon from "../assets/icons/Vector";
import saleIcon from "../assets/icons/BarChart";
import purchaseIcon from "../assets/icons/ShoppingBag";
import customization from "../assets/icons/Paint";
import orgImg from "../assets/images/org.png";
import itemImg from "../assets/images/image 49.png";
import taxImg from "../assets/images/image 47.png";
import prefImg from "../assets/images/image 47 (1).png";
import rewardImg from "../assets/images/image 48.png";
import saleImg from "../assets/images/image 51.png";
import purchaseImg from "../assets/images/image 45.png";
import customizationImg from "../assets/images/image 50.png";
import { Link } from "react-router-dom";
import Shirt from "../assets/icons/Shirt";
import orders from '../assets/images/orders.png'
const Settings = () => {
  const data = [
    {
      page: "Organization",
      icon: building,
      text: "Lorem ipsum dolor sit ametLorem Lorem ipsum dolor sit ametLorem ",
      img: orgImg ,
      imgH: 59,
      imgW: 64,
      route: "/settings/organization/profile",
    },
    {
      page: "Items",
      icon: itemIcon,
      text: "Lorem ipsum dolor sit ametLorem Lorem ipsum dolor sit ametLorem ",
      img: itemImg,
      imgH: 69.14,
      imgW: 43.74,
      route: "/settings/items/item",

    },
    {
      page: "Orders",
      icon: Shirt,
      text: "Lorem ipsum dolor sit ametLorem Lorem ipsum dolor sit ametLorem ",
      img: orders,
      imgH: 69.14,
      imgW: 43.74,
      route: "/settings/orders/ordersettings",

    },
    {
      page: "Tax And Complaints",
      icon: building,
      text: "Lorem ipsum dolor sit ametLorem Lorem ipsum dolor sit ametLorem ",
      img: taxImg,
      imgH: 47,
      imgW: 48,
      route: "/settings/tax-compliance/taxes",

    },
    {
      page: "Preferences",
      icon: prefIcon,
      text: "Lorem ipsum dolor sit ametLorem Lorem ipsum dolor sit ametLorem ",
      img: prefImg,
      imgH: 60,
      imgW: 58,
      route: "/settings/preferences/customer-vendor",

    },
    {
      page: "Rewards Settings",
      icon: RewardIcon,
      text: "Lorem ipsum dolor sit ametLorem Lorem ipsum dolor sit ametLorem ",
      img: rewardImg,
      imgH: 54,
      imgW: 57,
      route: "/settings/rewards-settings/rewards",

    },
    {
      page: "Sales",
      icon: saleIcon,
      text: "Lorem ipsum dolor sit ametLorem Lorem",
      img: saleImg,
      imgH: 51,
      imgW: 51,
      route: "/settings/sales/sales-order",

    },
    {
      page: "Purchase",
      icon: purchaseIcon,
      text: "Lorem ipsum dolor sit ametLorem Lorem",
      img: purchaseImg,
      imgH: 59,
      imgW: 60,
      route: "/settings/purchases/purchase-orders",

    },
    {
      page: "Customization",
      icon: customization,
      text: "Lorem ipsum dolor sit ametLorem",
      img: customizationImg,
      imgH: 92,
      imgW: 65,
      route: "/settings/customization/transaction-number-series",

    },
  ];

  return (
    <div>
      <p className="head1">Settings</p>
      <p className="text-[#818894]  text-[16px]  ">
        Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla{" "}
      </p>
      <div className="my-4 -mx-5 grid grid-cols-5 gap-y-5 items-center justify-center">
        {data?.map((data, index) => (
          <div
            key={index}
            className="w-56 h-48 border rounded-xl border-[#DADBDD] bg-[#FFFFFF] p-4 flex flex-col justify-between mx-auto"
          >
            <div className="flex justify-end">
              <data.icon />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#0B1320]">
                {data.page}
              </p>
              <p className="text-[10px] text-textSecondary mt-2">{data.text}</p>
            </div>
            {/* Bottom arrow and image alignment */}
            <div className="flex justify-between items-end">
              <Link to={data?.route}>
                <ArrowRight size={20} color="#004D4D" />
              </Link>{" "}
              <img
                src={data.img}
                alt={`${data.page} illustration`}
                className={`w-[${data.imgW}px] h-[${data.imgH}px] ${
                  data.page === "Customization" ? "-me-4 -mb-4" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
