import { useState } from "react";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { Link } from "react-router-dom";
import Select from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import TextArea from "../../../Components/Form/TextArea";
import Button from "../../../Components/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import PaymentTable from "./PaymentTable";

type Props = {};

const NewPayment = ({}: Props) => {
  const [supplierBills] = useState<[] | any>([]);
  const [paymentState, setPaymentState] = useState<[] | any>([]);

  return (
    <div>
      <div className="flex mb-3 gap-5">
        <Link to={"/purchase/payment-made"}>
          <div className="flex justify-center items-center h-11 w-11 bg-[white] rounded-full">
            <ChevronLeft color={"#0B1320"} strokeWidth="3" />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">Bill Payment</h4>
        </div>
      </div>

      <div className="grid grid-cols-12  gap-4 overflow-scroll hide-scrollbar ">
        <div className="col-span-9 bg-white p-6 rounded-t-2xl text-xs">
          <div className=" grid grid-cols-2 gap-4 pb-3">
            <Select
              label=" Supplier"
              placeholder="Select Supplier"
              options={[]}
            />
            <Input label="Payment Date" placeholder="Select Date" type="Date" />
            <Input label="Payment ID" placeholder="Payment Id" />
            <Input label="Reference" placeholder="Reference" />
            <Select
              label="Payment Mode"
              placeholder="Select payment mode"
              options={[]}
            />
            <Select
              label="Paid Through"
              placeholder="Select Paid Through"
              options={[]}
            />
          </div>
          <PaymentTable
            supplierBills={supplierBills}
            paymentState={paymentState}
            setPaymentState={setPaymentState}
          />
          <TextArea
            name="Add note"
            label="Add note"
            placeholder="Add note"
            size="md"
          />
        </div>
        <div className="col-span-3 bg-white p-6 rounded-t-2xl space-y-1 text-xs text-text_tertiary">
          <div className="flex">
            <div className="w-[75%]">
              <p>Amount Paid</p>
            </div>
            <div className="w-full text-end font-bold">
              <p className="text-end">₹{"0.00"}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-[75%]">
              <p>Amount used for payment</p>
            </div>
            <div className="w-full text-end font-bold">
              <p className="text-end">₹{"0.00"}</p>
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

export default NewPayment;
