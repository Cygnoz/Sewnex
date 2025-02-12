import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Banner from "../Organization/Banner"
import Input from "../../../Components/Form/Input";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import CheveronDown from "../../../assets/icons/CheveronDown";

type Props = {}

const MSMESettings = ({ }: Props) => {
  const initialMsmeSettings = {
    msmeType: "",
    msmeRegistrationNumber: "",
  };

  const [msmeSettings, setMsmeSettings] = useState(initialMsmeSettings);
  const [isGstRegistered, setIsGstRegistered] = useState(false);

  const { request: fetchMsmeSettings } = useApi("get", 5004);
  const { request: saveMsmeSettings } = useApi("post", 5004);

  useEffect(() => {
    const fetchAllMsmeSettings = async () => {
      try {
        const url = `${endpoints.GET_ALL_TAX}`;
        const { response, error } = await fetchMsmeSettings(url);
        if (!error && response) {
          const { msmeType, msmeRegistrationNumber } = response.data;
          setMsmeSettings((prevSettings) => ({
            ...prevSettings,
            msmeType: msmeType || "",
            msmeRegistrationNumber: msmeRegistrationNumber || "",
          }));
          setIsGstRegistered(!!msmeType);
        }
      } catch (error) {
        console.error("Error fetching MSME data:", error);
      }
    };

    fetchAllMsmeSettings();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMsmeSettings((prevMsme) => ({
      ...prevMsme,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${endpoints.ADD_NEW_TAX}`;
      const { response, error } = await saveMsmeSettings(url, msmeSettings);
      if (!error && response) {
        toast.success(response.data.message);
        setMsmeSettings(response.data);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.error("Error saving MSME data:", error);
    }
  };

  const handleToggle = async () => {
    const newIsGstRegistered = !isGstRegistered;
    setIsGstRegistered(newIsGstRegistered);
    if (!newIsGstRegistered) {
      const clearedData = {
        msmeType: "",
        msmeRegistrationNumber: "",
      };

      setMsmeSettings(clearedData);
      try {
        const url = `${endpoints.ADD_NEW_TAX}`;
        const { response, error } = await saveMsmeSettings(url, clearedData);
        if (!error && response) {
          toast.success(response.data.message);
        } else {
          toast.error(error.response?.data?.message);
        }
      } catch (error) {
        console.error("Error clearing MSME data:", error);
      }
    }
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="msmeType" className="block mb-1 text-[#4B5C79] text-sm">
                  MSME/Udyam Registration Type
                </label>
                <div className="relative mt-2.5">
                  <select
                    name="msmeType"
                    value={msmeSettings.msmeType}
                    onChange={handleChange}
                    className="block appearance-none h-9 mt-2 text-zinc-400 bg-white border border-inputBorder 
                        text-sm pl-3 pr-8 rounded-full w-full
                       outline-none"
                  >
                    <option value="" className="text-gray">
                      Select the Registration Type
                    </option>
                    <option value="Micro" className="text-gray">
                      Micro
                    </option>
                    <option value="Small" className="text-gray">
                      Small
                    </option>
                    <option value="Medium" className="text-gray">
                      Medium
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown strokeWidth="1.2" color="#495160" />

                  </div>
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
                    value={msmeSettings.msmeRegistrationNumber}
                    onChange={handleChange}
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