import Button from "../../../Components/Button";
import Input from "../../../Components/Form/Input";
import Banner from "../Organization/Banner";
import bgcard from "../../../assets/images/refandeaarnnn.png";
import referimage from "../../../assets/images/referandear.png";

type Props = {};

const ReferAndEran = ({}: Props) => {
  return (
    <div className="text-[#303F58] overflow-y-scroll hide-scrollbar h-[100vh]">
      <Banner seeOrgDetails />
      <p className="text-[20px] font-bold mt-3">Refer and Earn</p>
      
      <div
        className="bg-white w-full text-[14px] rounded-lg mt-5 flex justify-evenly gap-10"
        style={{
          backgroundImage: `url(${referimage})`,
          backgroundSize: "cover", // Ensures the image covers the entire area
          backgroundPosition: "center", // Centers the image
        }}
      ><div></div>
        <img src={bgcard} alt="" width={'150px'} height={"154px"} /> 
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
        

        {/* Conditionally Render Inputs */}
        <div className="mt-4">
          <div className="flex flex-col gap-2 mt-3">
            <Input
              label="Set Amount"
              placeholder="Enter Reward Amount"
              type="number"
              // required
              size="md"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default ReferAndEran;
