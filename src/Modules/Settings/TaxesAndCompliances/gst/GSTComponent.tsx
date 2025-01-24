import { useState } from "react";
import TaxRate from "./TaxRate";
import GstSettings from "./GstSettings";
import Banner from "../../Organization/Banner";


type Props = {}

function GSTComponent({}: Props) {
  const [selectedTab, setSelectedTab] = useState<string>("taxRate");

  return (
    <>
      <Banner/>
    <div className="mt-5">
      <div className="mt-5 flex gap-7 rounded-[40px] bg-white p-1.5">
        <button
          className={`px-8 py-2 rounded-[40px] text-xs  ${
            selectedTab === "taxRate" ? "bg-[#F7ECD9] font-bold text-[#585953]" : "text-[#585953] font-semibold"
          }`}
          onClick={() => setSelectedTab("taxRate")}
        >
          Tax Rate
        </button>
        <button
          className={`px-4 py-2  rounded-[40px] text-xs  ${
            selectedTab === "gstSettings" ? "bg-[#F7ECD9] font-bold  text-[#585953]" : "text-[#585953] font-semibold"
          }`}
          onClick={() => setSelectedTab("gstSettings")}
        >
          GST Settings
        </button>
      </div>

      <div className="mt-4">
        {selectedTab === "taxRate" ? <TaxRate /> : <GstSettings/>}
      </div>
    </div>
    </>
  );
}

export default GSTComponent;
