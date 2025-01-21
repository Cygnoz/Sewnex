import { Link } from "react-router-dom";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import Select from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import RadioButton from "../../../Components/Form/RadioButton";
import { useState } from "react";
import DebitNoteTable from "./DebitNoteTable";

type Props = {};

const NewDebitNote = ({}: Props) => {
      const [selected, setSelected] = useState<string>("Cash");
    const [state,setstate]=useState([])
    const [selectedBill,setSelectedbill]=useState([])
  const handleRadioChange = (value: string, name: string) => {
    console.log(`Selected ${name}: ${value}`);
    setSelected(value);
  };
  return (
    <div>
      <div className="flex mb-3 gap-5">
        <Link to={"/purchase/debitnote"}>
          <div className="flex justify-center items-center h-11 w-11 bg-[white] rounded-full">
            <ChevronLeft color={"#0B1320"} strokeWidth="3" />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">Create New Bill</h4>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 h-[90vh] overflow-scroll hide-scrollbar ">
        <div className="col-span-9 bg-white p-6 rounded-t-2xl">
          <div className="grid grid-cols-3 gap-4 ">
            <Select
              label=" Supplier"
              placeholder="Select Supplier"
              options={[]}
            />
            <Input label="Debit Note" placeholder="Debit Note No" />
            <Select label=" Bill" placeholder="Select Bill" options={[]} />
            <Select
              label=" Bill Type"
              placeholder="Select Bill Type"
              options={[]}
            />
            <Select
              label="Supplier Debit Date"
              placeholder="Select Date"
              options={[]}
            />
            <Select
              label="Deposit To"
              placeholder="Select Account"
              options={[]}
            />
            <Input
              label="Subject"
              placeholder="Enter Subject in 50 characters"
            />
             <div>
              <label
                htmlFor="PaymentMode"
                className="block text-xs text-[#495160] mb-1 font-normal text-deepStateBlue"
              >
                Payment Mode
              </label>
              <div className="flex items-center space-x-4 text-textColor text-sm mt-2">
                <RadioButton
                  id="Cash"
                  name="paymentMode"
                  label="Cash"
                  selected={selected}
                  onChange={handleRadioChange}
                />
                <RadioButton
                  id="Credit"
                  name="paymentMode"
                  label="Credit"
                  selected={selected}
                  onChange={handleRadioChange}
                />
              </div>
            </div>
          </div>
          <DebitNoteTable  state={state} setState={setstate}  selectedBill={selectedBill} />
        </div>
      </div>
    </div>
  );
};

export default NewDebitNote;
