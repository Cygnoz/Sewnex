import { useState } from "react";
import Banner from "../../Organization/Banner";
import TaxRateVat from "./TaxRateVat";
import VatSettings from "./VatSettings";

type Props = {}

function VATComponent({}: Props) {
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
          VAT Settings
        </button>
      </div>

      <div className="mt-4">
        {selectedTab === "taxRate" ? <TaxRateVat /> : <VatSettings/>}
      </div>
    </div>
    </>
  )
}

export default VATComponent