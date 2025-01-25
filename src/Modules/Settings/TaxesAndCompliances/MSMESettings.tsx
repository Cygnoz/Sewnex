import { useState } from "react";
import Banner from "../Organization/Banner"
import Select from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import Button from "../../../Components/Button";

type Props = {}

const MSMESettings = ({ }: Props) => {
  const [isGstRegistered, setIsGstRegistered] = useState(false);

  const handleToggle = () => {
    setIsGstRegistered(!isGstRegistered);
  };
  return (
    <div>
      <Banner />
      <p className="text-[#303F58] font-bold mt-4">MSME Settings</p>

      <div
        className="p-6 mt-4 rounded-lg"
        style={{
          background: "linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)",
        }}
      >
        <div className="flex justify-between items-center">
          <p className=" text-[#303F58] text-sm">Is your business MSME registered?</p>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isGstRegistered} onChange={handleToggle} />
              <div
                className={`w-11 h-6 rounded-full shadow-inner transition-colors ${isGstRegistered ? "bg-[#97998E]" : "bg-[#DCDEE2]"
                  }`}
              ></div>
              <div
                className={`dot absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${isGstRegistered ? "transform translate-x-full left-2" : "left-1"
                  }`}
              ></div>
            </div>
            <div className="ml-3 text-[#495160] text-sm">{isGstRegistered ? "Yes" : "No"}</div>
          </label>
        </div>
      </div>

      {isGstRegistered && (
        <div className="p-6 rounded-lg bg-white mt-4">
          <form className="flex flex-col gap-4 w-full">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="msmeType" className="block mb-1 text-[#4B5C79] text-sm">
                  MSME/Udyam Registration Type
                </label>
                <div className=" mt-2.5">
                  <Select
                    options={[
                      { value: "Micro", label: "Micro" },
                      { value: "Small", label: "Small" },
                      { value: "Medium", label: "Medium" },
                    ]}
                    placeholder="Select the Registration Type"
                  />

                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="msmeRegistrationNumber" className="text-[#4B5C79] text-sm">
                  MSME/Udyam Registration Number
                </label>
                <div className="mt-1.5">
                <Input
                  type="text"
                  name="msmeRegistrationNumber"
                  placeholder="Enter the Registration Number"
                  />
                  </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="primary" type="submit" className="pl-10 pr-10 h-[38px] text-sm" size="sm">
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default MSMESettings