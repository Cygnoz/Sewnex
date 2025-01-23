import { Link } from "react-router-dom";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import Select from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import RadioButton from "../../../Components/Form/RadioButton";
import { useState } from "react";
import DebitNoteTable from "./DebitNoteTable";
import TextArea from "../../../Components/Form/TextArea";
import Button from "../../../Components/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";

type Props = {};

const NewDebitNote = ({}: Props) => {
  const [selected, setSelected] = useState<string>("Cash");
  const [state, setstate] = useState([]);
  const [selectedBill] = useState([]);
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
      <div className="grid grid-cols-12 gap-4 max-h-[90vh] overflow-scroll hide-scrollbar ">
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
          <DebitNoteTable
            state={state}
            setState={setstate}
            selectedBill={selectedBill}
          />
        </div>
        <div className="col-span-3 bg-white p-6 rounded-t-2xl" >
        <TextArea
            name="description"
            label="Add Note"
            placeholder="Add a note"
            size="md"
          />
          <TextArea
            name="description"
            label="Terms & conditions"
            placeholder="Add Terms & Conditions of your Business"
            size="md"
          />
        <div className=" my-4 pb-4  text-dropdownText border-b-2 border-slate-200 space-y-2  text-xs text-[#495160]" >
            <div className="flex ">
                <div className="w-[75%]">
                  {" "}
                  <p>Sub Total</p>
                </div>
                <div className="w-full text-end">
                  {" "}
                  <p className="text-end font-bold">
                    {/* {oneOrganization?.baseCurrency}{" "} */}₹{"0.00"}{" "}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className="w-[75%]">
                  {" "}
                  <p>Total Quantity</p>
                </div>
                <div className="w-full text-end">
                  {" "}
                  <p className="text-end font-bold">
                    {/* {oneOrganization?.baseCurrency}{" "} */}{"0.00"}{" "}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className="w-[75%]">
                  {" "}
                  <p>SGST</p>
                </div>
                <div className="w-full text-end">
                  {" "}
                  <p className="text-end font-bold">
                    {/* {oneOrganization?.baseCurrency}{" "} */}₹{"0.00"}{" "}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className="w-[75%]">
                  {" "}
                  <p>CGST</p>
                </div>
                <div className="w-full text-end">
                  {" "}
                  <p className="text-end font-bold">
                    {/* {oneOrganization?.baseCurrency}{" "} */}₹{"0.00"}{" "}
                  </p>
                </div>
              </div>
        </div>
        <div className="flex text-black my-4">
            <div className="w-[75%] font-bold text-sm text-[#495160]">
              {" "}
              <p>Total</p>
            </div>
            <div className="w-full text-end font-bold text-base">
              {" "}
              <p className="text-end"> ₹{"0.00"} </p>
            </div>
          </div>

        </div>
      </div>
      <div
        className=" flex bg-white p-4 rounded-b-2xl  sticky"
        style={{
          boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.23)",
        }}
      >
        <div className="flex gap-2 ml-auto">
          <Button variant="secondary">Cancel</Button>
          <Button variant="secondary">
            <PrinterIcon color={"#0b9d56"} height={18} width={18} /> Print
          </Button>
          <Button variant="primary">Save & Send</Button>
        </div>
      </div>
    </div>
  );
};

export default NewDebitNote;
