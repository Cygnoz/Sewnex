import { useState } from "react";
import RadioButton from "../../../Components/Form/RadioButton";

type Props = {}

function Bills({}: Props) {
    const [selected, setSelected] = useState<string>("Business");
  
    const handleRadioChange = (value: string, name: string) => {
      console.log(`Selected ${name}: ${value}`);
      setSelected(value);
    };
  return (
    <div>
       <label className="block text-sm mb-1 text-labelColor" htmlFor="">
        Customer Type
      </label>
      <div className="mt-3">
     
      <div className="flex items-center space-x-4 text-textColor text-sm">
        <RadioButton
          id="Goods"
          name="type"
          label="Goods"
          selected={selected}
          onChange={handleRadioChange}
        />
        <RadioButton
          id="Individual"
          name="customerType"
          label="Individual"
          selected={selected}
          onChange={handleRadioChange}
        />
      </div>
    </div>
    </div>
  )
}

export default Bills