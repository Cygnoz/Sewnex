import { Link } from "react-router-dom"
import ChevronLeft from "../../../assets/icons/ChevronLeft"
import Info from "../../../assets/icons/Info"
import { useState } from "react";
import LineChart from "../../../assets/icons/LineChart";
import History from "../../../assets/icons/History";
import Overview from "./Overview/Overview";
import PaymentHistory from "./Payment History/PaymentHistory";

type Props = {}

function ViewSupplier({ }: Props) {
    const [activeTab, setActiveTab] = useState<string>("overview");

    const handleTabSwitch = (tabName: string) => {
        setActiveTab(tabName);
    };
    return (
        <div>
            <div className="flex gap-5 items-center">
                <Link to="/supplier">
                    <div
                        style={{ borderRadius: "50%" }}
                        className="w-[40px] h-[40px] flex items-center justify-center bg-[#FFFFFF]"
                    >
                        <ChevronLeft color="#0F172A" />
                    </div>
                </Link>
                <p className="text-textColor text-xl font-bold">Supplier Details</p>
            </div>
            <div className=" bg-white h-auto rounded-md text-textColor  px-2 mt-3 p-2">
                <div className="grid grid-cols-3 px-5 pt-3 items-center w-full gap-2">
                    <div
                        onClick={() => handleTabSwitch("overview")}
                        className={`text-[14px] font-semibold ${activeTab === "overview" ? "bg-[#F7E7CE]" : ""} py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
                    >
                        <Info color="#303F58" /> Overview
                    </div>

                    <div
                        onClick={() => handleTabSwitch("purchaseHistory")}
                        className={`text-[14px] font-semibold ${activeTab === "purchaseHistory" ? "bg-[#F7E7CE]" : ""}  py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
                    >
                        <LineChart /> Purchase History
                    </div>
                    <div
                        onClick={() => handleTabSwitch("paymentHistory")}
                        className={`text-[14px] font-semibold ${activeTab === "paymentHistory" ? "bg-[#F7E7CE]" : ""}  py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
                    >
                        <History /> Payment History
                    </div>
                </div>
                <div className="px-5 py-3">
                    {activeTab === "overview" && (
                        <Overview />
                    )}
                    {activeTab === "purchaseHistory" && (
                        // <PurchaseHistory /> 
                        <div>
                            hu
                        </div>
                    )}
                    {activeTab === "paymentHistory" && (
                        <PaymentHistory />
                    )}
                </div>
            </div>

        </div>
    )
}

export default ViewSupplier