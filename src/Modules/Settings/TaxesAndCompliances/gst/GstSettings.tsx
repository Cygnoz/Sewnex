import { useState } from "react";
import Input from "../../../../Components/Form/Input";
import Button from "../../../../Components/Button";

type Props = {}

function GstSettings({ }: Props) {

  const [isGstRegistered, setIsGstRegistered] = useState(true);
  const handleToggle = () => {
    setIsGstRegistered(!isGstRegistered);
  };
  return (
    <div>
      <p className="text-[#303F58] font-bold">GST Settings</p>

      <div className="p-6 mt-4 rounded-lg" style={{
        background: 'linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)',
      }}>
        <div className="flex justify-between items-center">
          <p className=" text-[#303F58] text-sm">Is your business registered for GST?</p>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isGstRegistered} onChange={handleToggle} />
              <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${isGstRegistered ? 'bg-[#97998E]' : 'bg-[#DCDEE2]'}`}></div>
              <div className={`dot absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${isGstRegistered ? 'transform translate-x-full left-2' : 'left-1'}`}></div>
            </div>
            <div className="ml-3 text-textColor  text-sm">{isGstRegistered ? 'No' : 'Yes'}</div>
          </label>
        </div>
      </div>

      <div>
        {isGstRegistered && (
          <div className="p-6 rounded-lg bg-white mt-4">
            <form  className="flex justify-between gap-4">
              <div className="text-[#495160] text-sm w-[50%]">
                <div>
                  <label htmlFor="gstIn">GSTIN <span className="text-xs">(Maximum 15 Digits)</span></label>
                  <Input
                    type="text"
                    name="gstIn"
                    placeholder="Enter GSTIN"
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="gstBusinessTradeName">Business Trade Name</label>
                  <Input
                   type="text"
                   name="gstBusinessTradeName"
                   placeholder="Enter Business Trade Name"
                  />
                </div>
                <div className="mt-5">
                  <label className="block mb-1.5 text-dropdownText font-semibold">
                    Composite Scheme
                  </label>
                  <div className="flex items-center gap-3 mt-2.5">
                    <input
                      type="checkbox"
                      className="accent-[#97998E] bg-white h-5 w-5"
                      id="compositionSchema"
                      name="compositionSchema"
                    />
                    <label htmlFor="compositionSchema" >
                      My business is registered for Composition Scheme.
                    </label>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block mb-1.5 text-dropdownText font-semibold">Import / Export</label>
                  <div className="flex items-center gap-3 mt-2.5">
                    <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="import/export"
                      name="import/export"
                    />
                    <label htmlFor="import/export">
                      My business is involved in SEZ / Overseas Trading
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-[#495160] text-sm w-[50%]">
                <div>
                  <label htmlFor="gstBusinessLegalName">Business Legal Name</label>
                  <Input
                  type="text"
                  name="gstBusinessLegalName"
                  placeholder="Enter Business Legal Name"
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="gstRegisteredDate" className="block mb-1">
                    GST Registered On Date
                  </label>
                  <div className="relative w-full">
                    <Input
                    placeholder="Select Date"
                    />
                  </div>
                  <div className="mt-5">
                    <label className="block mb-1.5 text-dropdownText font-semibold">Reverse Charge</label>
                    <div className="flex items-center gap-3 mt-2.5">
                      <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="reverseCharge"
                        name="reverseCharge"
                      />
                      <label htmlFor="reverseCharge" className="">
                        My business is registered for Composition Scheme.
                      </label>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="block mb-1.5 text-dropdownText font-semibold">Digital Services</label>
                    <div className="flex items-center gap-3 mt-2.5">
                      <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="digitalServices"
                        name="digitalServices"
                        />
                      <label htmlFor="digitalServices" >
                        Track sale of digital services to overseas customers
                      </label>
                    </div>
                    <p className="w-[95%] mt-3 text-xs">Enabling this option will let you record and track export of digital services to individuals</p>
                    <div className="flex justify-end mt-6">
                      <Button size="sm" className="text-sm pl-10 pr-10" type="submit">Save</Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default GstSettings