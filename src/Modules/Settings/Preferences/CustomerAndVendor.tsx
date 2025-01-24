import { useState } from "react";
import RadioButton from "../../../Components/Form/RadioButton";
import Banner from "../Organization/Banner";
import BillingModal from "./BillingModal";

type Props = {};

const CustomerAndVendor = ({}: Props) => {
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const handleRadioChange = (id: string) => {
    setSelectedRadio(id);
  };
  return (
    <>
      <div className=" text-[#303F58]  overflow-y-scroll hide-scrollbar h-[100vh]">
        <Banner seeOrgDetails />
        <p className="text-[20px] font-bold mt-3">Customer and Vendor</p>

        <div className="mt-3 bg-white w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold">Default Customer Type</p>
          <p className="text-[#818894]">
            Select the default customer type based on the kind of customer you
            usually set your products or services to. The default customer type
            will be pre-selected in the customer creation form
          </p>
          <div className="space-y-4 mt-3">
            <div className="flex justify-start">
              <RadioButton
                id="Business"
                name="Business"
                label="Business"
                selected={selectedRadio}
                onChange={handleRadioChange}
              />
            </div>
            <div className="flex justify-start">
              <RadioButton
                id="Individual"
                name="Individual"
                label="Individual"
                selected={selectedRadio}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-3 mt-7">
         <div className="flex items-center gap-1">
         <p className=" font-[600] text-[#004D4D] ">
            <span>Customer and Vendor Billing </span>
          </p>
          <BillingModal />
         </div>
          <p className="text-[#818894] bg-[#F4F4F4] p-10 rounded-lg">
      
          </p>
        </div>
        <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-3 mt-7">
         <div className="flex items-center gap-1">
         <p className=" font-[600] text-[#004D4D] ">
            <span>Customer and Vendor Shipping</span>
          </p>
          <BillingModal />
         </div>
          <p className="text-[#818894] bg-[#F4F4F4] p-10 rounded-lg">
      
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerAndVendor;
