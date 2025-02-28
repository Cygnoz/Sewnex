import { useNavigate } from "react-router-dom"
import BackIcon from "../../assets/icons/BackIcon"
import { useState } from "react";
import TickIcon from "../../assets/icons/TickIcon";
import Button from "../../Components/Button";
import CustomerTab from "./orderTabs/CustomerTab";
import ServiceTab from "./orderTabs/ServiceTab";
import FabricTab from "./orderTabs/FabricTab";
import MeasurementTab from "./orderTabs/MeasurementTab";
import StyleTab from "./orderTabs/StyleTab";
import AdditionalInfoTab from "./orderTabs/AdditionalInfoTab";
import OrderSummaryTab from "./orderTabs/OrderSummaryTab";

type Props = {}

function AddOrder({ }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const nextTab = () => setActiveTab((prev) => Math.min(prev + 1, 6));
  const prevTab = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  const tabs = [
    { id: 0, label: "Customer" },
    { id: 1, label: "Service" },
    { id: 2, label: "Fabric" },
    { id: 3, label: "Measurement" },
    { id: 4, label: "Style" },
    { id: 5, label: "Additional Info" },
    { id: 6, label: "Order Summary" },
  ];

  const navigate = useNavigate()
  return (
    <div>
      <div>
        <div className="flex items-center gap-4">
          <div onClick={() => navigate("/order")}>
            <BackIcon />
          </div>
          <div>
            <h1 className="text-base font-bold text-heading">Create new order</h1>
            <p className="text-[#495160] mt-2 text-xs">
              Add and process a new customer order efficiently
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-6 flex justify-center items-center">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            {/* Tab Circle */}
            <div className="flex flex-col items-center w-16">
              <p
                className={`border-2 flex items-center justify-center text-sm font-semibold rounded-full w-8 h-8 ${activeTab === index
                  ? "border-[#B47300] bg-white text-[#C88000]"
                  : activeTab > index
                    ? "border-[#B47300] bg-[#C88000] text-white"
                    : "border-[#A1AEBE] bg-white text-[#242E39]"
                  }`}
              >
                {activeTab > index ? <TickIcon /> : `0${index + 1}`}
              </p>

              {/* Tab Label */}
              <p
                className={`text-center mt-1 w-52 text-sm font-medium ${activeTab >= index
                  ? "text-[#B47300] font-bold"
                  : "text-[#465668]"
                  }`}
              >
                {tab.label}
              </p>
            </div>

            {/* Line between tabs (except last one) */}
            {index < tabs.length - 1 && (
              <div
                className={`bg-[#A1AEBE] h-[2px] w-[80px] -mt-6 ${activeTab > index ? "bg-[#B47300]" : "bg-[#A1AEBE]"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === 0 && (
          <CustomerTab />
        )}
        {activeTab === 1 && (
          <ServiceTab />
        )}
        {activeTab === 2 && (
          <FabricTab />
        )}
        {activeTab === 3 && (
          <MeasurementTab />
        )}
        {activeTab === 4 && (
          <StyleTab />
        )}
        {activeTab === 5 && (
          <AdditionalInfoTab />
        )}
        {activeTab === 6 && (
          <OrderSummaryTab />
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4 ">
        {activeTab === 0 ? (
          <Button
            variant="secondary"
            className="pl-10 pr-10"
          >
            Cancel
          </Button>
        ) : (
          <Button
            onClick={prevTab}
            variant="secondary"
            className="pl-10 pr-10"
          >
            Back
          </Button>
        )}
        {activeTab === 6 ? (
          <Button className="pl-11 pr-11">
            Done
          </Button>
        ) : (
          <Button onClick={nextTab} className="pl-11 pr-11">
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

export default AddOrder