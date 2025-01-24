import { useState } from "react";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { Link } from "react-router-dom";
import Select from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import TextArea from "../../../Components/Form/TextArea";
import Button from "../../../Components/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import PaymentTable from "./PaymentTable";
import ObjectSelect from "../../../Components/Form/ObjectSelect";
import AddSupplierModal from "../../Supplier/AddSupplierModal";

type Props = {};

const NewPayment = ({}: Props) => {
  const [supplierBills] = useState<[] | any>([]);
  const [paymentState, setPaymentState] = useState<[] | any>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<any>([]);
  const [Suppliers] = useState<[] | any>([
    {
      supplierProfile:
        "https://i.postimg.cc/Qd5VB9FY/colorful-swirl-logo-design-concept-illustration-vector.jpg",
      ame: "John",
      lastName: "Doe",
      companyName: "Tech Solutions Ltd.",
      supplierDisplayName: "Tech Supplies",
      supplierEmail: "john.doe@techsolutions.com",
      workPhone: "+1234567890",
      mobile: "+0987654321",
      billingCountry: "India",
      billingAddressStreet1: "123 Tech Park",
      billingAddressStreet2: "Block B",
      billingCity: "Pune",
      billingState: "Maharashtra",
      billingPinCode: "411057",
      billingPhone: "+911234567890",
      billingFaxNum: "+912345678901",
      shippingCountry: "India",
      shippingAddressStreet1: "456 Tech Street",
      shippingAddressStreet2: "Suite 202",
      shippingCity: "Mumbai",
      shippingState: "Maharashtra",
      shippingPinCode: "400001",
      shippingPhone: "+912345678901",
      shippingFaxNum: "+911234567890",
    },
    {
      supplierProfile:
        "https://i.postimg.cc/XY8qcMg9/depositphotos-75675633-stock-illustration-colorful-sun-logo.webp",
      ame: "Jane",
      lastName: "Smith",
      companyName: "Innovate Corp.",
      supplierDisplayName: "Innovate Supplies",
      supplierEmail: "jane.smith@innovatecorp.com",
      workPhone: "+9876543210",
      mobile: "+1234567890",
      billingCountry: "USA",
      billingAddressStreet1: "789 Innovation Drive",
      billingAddressStreet2: "Building A",
      billingCity: "San Francisco",
      billingState: "California",
      billingPinCode: "94107",
      billingPhone: "+14155551234",
      billingFaxNum: "+14155554321",
      shippingCountry: "USA",
      shippingAddressStreet1: "789 Innovation Drive",
      shippingAddressStreet2: "Building B",
      shippingCity: "San Francisco",
      shippingState: "California",
      shippingPinCode: "94107",
      shippingPhone: "+14155556789",
      shippingFaxNum: "+14155598765",
    },
    {
      supplierProfile:
        "https://i.postimg.cc/XY8qcMg9/depositphotos-75675633-stock-illustration-colorful-sun-logo.webp",
      ame: "Jane",
      lastName: "Smith",
      companyName: "Innovate Corp.",
      supplierDisplayName: "Innovate Supplies",
      supplierEmail: "jane.smith@innovatecorp.com",
      workPhone: "+9876543210",
      mobile: "+1234567890",
      billingCountry: "USA",
      billingAddressStreet1: "789 Innovation Drive",
      billingAddressStreet2: "Building A",
      billingCity: "San Francisco",
      billingState: "California",
      billingPinCode: "94107",
      billingPhone: "+14155551234",
      billingFaxNum: "+14155554321",
      shippingCountry: "USA",
      shippingAddressStreet1: "789 Innovation Drive",
      shippingAddressStreet2: "Building B",
      shippingCity: "San Francisco",
      shippingState: "California",
      shippingPinCode: "94107",
      shippingPhone: "+14155556789",
      shippingFaxNum: "+14155598765",
    },
  ]);

  const handleSelect = (option: any) => {
    setSelectedSupplier(option);
    console.log("Selected Supplier:", option);
  };

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
          <ObjectSelect
              required
              placeholder="Select Supplier"
              options={Suppliers}
              label="Select Supplier"
              selectedOption={selectedSupplier}
              onSelect={handleSelect}
              searchKey={"supplierDisplayName"}
              displayFields={{
                optionImage: "supplierProfile",
                optionLabel: "supplierDisplayName",
                optionMobile: "mobileNumber",
              }}
              NewItem={AddSupplierModal}
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
