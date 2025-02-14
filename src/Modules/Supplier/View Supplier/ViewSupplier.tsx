import { Link, useParams } from "react-router-dom"
import ChevronLeft from "../../../assets/icons/ChevronLeft"
import Info from "../../../assets/icons/Info"
import { useContext, useEffect, useState } from "react";
import LineChart from "../../../assets/icons/LineChart";
import History from "../../../assets/icons/History";
import Overview from "./Overview/Overview";
import PaymentHistory from "./Payment History/PaymentHistory";
import PurchaseHistory from "./Purchase History/PurchaseHistory";
import { SupplierDetailsContext, SupplierResponseContext } from "../../../Context/ContextShare";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import { SupplierData } from "../../../Types/Supplier";

type Props = {}

interface Status {
    status: string;
  }

function ViewSupplier({ }: Props) {
    
    const {setSupplierDetails} = useContext(SupplierDetailsContext)!;
    const { request: getOneSupplier } = useApi("get", 5009);
    const { id } = useParams<{ id: string }>();
    const [supplier, setSupplier] = useState<SupplierData | null>(null);
    const { supplierResponse } = useContext(SupplierResponseContext)!;
    const [statusData, setStatusData] = useState<Status>({ status: "" });

    const [activeTab, setActiveTab] = useState<string>("overview");

    const getOneSupplierData = async () => {
        if (!id) return;
        try {
          const url = `${endpoints.GET_ONE_SUPPLIER}/${id}`;
          const body = { organizationId: "INDORG0001" };
          const { response, error } = await getOneSupplier(url, body);
          if (!error && response) {
            setSupplier(response.data);
            setSupplierDetails(response.data)
            // setStatusData((prevData) => ({
            //   ...prevData,
            //   status: response.data.status,
            // }));
          }
        } catch (error) {
          console.error("Error fetching supplier:", error);
        }
      };
    
      useEffect(() => {
        if (id) {
          getOneSupplierData();
        }
      }, [id, supplierResponse]);
    
      useEffect(() => {
        if (supplier) {
          setStatusData({ status: supplier.status });
        }
      }, [supplier]);
    

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
                        <Overview  supplier={supplier} statusData={statusData} setStatusData={setStatusData} />
                    )}
                    {activeTab === "purchaseHistory" && (
                         <PurchaseHistory /> 
                        
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