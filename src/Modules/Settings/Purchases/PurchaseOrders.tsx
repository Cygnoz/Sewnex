import { useState } from "react";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import RadioButton from "../../../Components/Form/RadioButton";
import Banner from "../Organization/Banner";
import TextArea from "../../../Components/Form/TextArea";
import Button from "../../../Components/Button";

type Props = {};

const PurchaseOrders = ({}: Props) => {
  const [selected, setSelected] = useState<string>("Cash");

  const handleRadioChange = (value: string, name: string) => {
    console.log(`Selected ${name}: ${value}`);
    setSelected(value);
  };
  return (
    <div className="h-[100vh] overflow-scroll hide-scrollbar">
      <Banner />
      <div className="my-2">
        <p className="font-bold text-text_primary">Purchase Order</p>

        <div className="p-2 rounded-lg bg-white   w-[221px]">
          <div className="flex bg-[#f7ecda] gap-2 items-center justify-center  p-2 rounded-lg">
            <SettingsIcon color="#3c424f" strokeWidth="3" />
            <p className="text-text_tertiary font-semibold"> General</p>
          </div>
        </div>
        <div className="bg-white my-4 p-5 rounded-xl text-sm">
          <p className="font-bold text-text_tertiary">
            When do you want your purchase orders to be closed?
          </p>
        <div className="flex flex-col items-start space-y-2 mt-2">
            <RadioButton
              id="When a Purchase Receive is recorded"
              label="When a Purchase Receive is recorded"
              selected={selected}
              onChange={handleRadioChange} name={"purchaseOrder"}            />
            <RadioButton
              id="When a Bill is created"
              name="purchaseOrder"
              label="When a Bill is created"
              selected={selected}
              onChange={handleRadioChange}
            />
            <RadioButton
              id="When Receives and Bills are recorded"
              name="purchaseOrder"
              label="When Receives and Bills are recorded"
              selected={selected}
              onChange={handleRadioChange}
            />
        </div >
        </div>
        <div className="bg-white my-4 p-5 rounded-xl text-sm">
        <p className="font-bold text-text_tertiary">
         Terms & Condition
          </p>
          <TextArea/>
        </div>
        <div className="bg-white my-4 p-5 rounded-xl text-sm">
        <p className="font-bold text-text_tertiary">
        Notes
          </p>
          <TextArea/>
        </div>

       <div className="flex justify-end"> <Button>Save</Button></div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
