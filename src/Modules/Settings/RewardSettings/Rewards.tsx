import Banner from "../Organization/Banner";
import bgcard from "../../../assets/images/Enable-membership-card.svg";
import RadioButton from "../../../Components/Form/RadioButton";
import Input from "../../../Components/Form/Input"; // Import the Input component
import { useState } from "react";
import { ArrowBigRight } from "../../../assets/icons/ArrowBigRight";
import { CoinsIcon } from "../../../assets/icons/CoinsIcon";
import Button from "../../../Components/Button";

type Props = {};

const Rewards = ({}: Props) => {
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const handleRadioChange = (id: string) => {
    setSelectedRadio(id);
  };

  return (
    <div className="text-[#303F58] overflow-y-scroll hide-scrollbar h-[100vh]">
      <Banner seeOrgDetails />
      <p className="text-[20px] font-bold mt-3">Customer and Vendor</p>
      <div className="bg-white w-full text-[14px] rounded-lg mt-5">
        <img src={bgcard} alt="" className="w-full" />
      </div>
      <div className="bg-[#FAF2E6] w-full h-[68px] text-[14px] rounded-lg mt-5 p-6">
        <div className="flex justify-between items-center">
          <p>Enable Rewards?</p>
          <div className="relative inline-block w-[38px] h-[20px]">
            <input type="checkbox" id="toggleSwitch" className="hidden peer" />
            <label
              htmlFor="toggleSwitch"
              className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-[13px] peer-checked:bg-[#97998E] transition duration-300 cursor-pointer"
            ></label>
            <div className="absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-md transform transition duration-300 peer-checked:translate-x-[17px]"></div>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-white w-full p-6 text-[14px] rounded-lg space-y-3">
        <p className="font-bold">Choose Your Reward System You Prefer</p>

        <div className="flex items-center gap-5 mt-8">
          <div className="flex justify-start">
            <RadioButton
              id="Cashback System"
              name="reward"
              label="Cashback System"
              selected={selectedRadio}
              onChange={handleRadioChange}
            />
          </div>
          <div className="flex justify-start">
            <RadioButton
              id="Reward Point System"
              name="reward"
              label="Reward Point System"
              selected={selectedRadio}
              onChange={handleRadioChange}
            />
          </div>
        </div>

        {/* Conditionally Render Inputs */}
        <div className="mt-4">
          {selectedRadio === "Cashback System" && (
            <div className="flex flex-col gap-2 mt-3">
              <Input
                label="Percentage %"
                placeholder="Enter percentage"
                type="number"
                required
                size="md"
              />
            </div>
          )}

          {selectedRadio === "Reward Point System" && (
            <div className="flex flex-col gap-2">
              <div className="bg-[#FAF2E6] w-full h-[68px] text-[14px] rounded-lg mt-5 p-6">
                <div className="flex justify-between items-center">
                  <p>
                    Note: The Point You Can Set Based on the Currency Amount of
                    Yours{" "}
                  </p>
                  <div className="bg-white flex justify-center px-5 gap-5 items-center">
                    <p>100</p>
                    <ArrowBigRight />
                    <div className="flex items-center gap-2">
                      <CoinsIcon />
                      <p>Points</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start gap-5 mt-3 ">
               <div>
               <Input
                  label="Cash"
                  placeholder="Enter cash value"
                  type="number"
                  required
                  size="lg"
                />
               </div>
                <Input
                  label="Points"
                  placeholder="Enter points value"
                  type="number"
                  required
                  size="lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    <div className="flex justify-end mt-3">
    <Button>Save</Button>
    </div>
    </div>
  );
};

export default Rewards;
