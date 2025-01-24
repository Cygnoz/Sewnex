import {  useState } from "react";
import toast from "react-hot-toast";
import CheveronDown from "../../../assets/icons/CheveronDown";
import Button from "../../../Components/Button";
import Banner from "../Organization/Banner";
import useApi from "../../../Hooks/useApi";
import WalletMinimal from "../../../assets/icons/WalletMinimal";
import Link2 from "../../../assets/icons/Link2";
import Checkbox from "../../../Components/Form/Checkbox";
import RadioButton from "../../../Components/Form/RadioButton";
import Input from "../../../Components/Form/Input";
import TextArea from "../../../Components/Form/TextArea";

type Props = {};

function Invoices({}: Props) {
  const { request: AddSalesInvoiceSettings } = useApi("put", 5007);
  const [invoiceURLDropdown, setInvoiceURLDropdown] = useState(false);

  const [invoiceState, setInvoiceState] = useState({
    invoiceEdit: false,
    displayExpenseReceipt: false,
    salesOrderNumber: "orderNum",
    paymentReceipt: false,
    invoiceQrCode: false,
    invoiceQrType: "InvoiceURL",
    invoiceQrDescription: "",
    zeroValue: false,
    salesInvoiceTC: "",
    salesInvoiceCN: "",
  });

  const handleInputChange = (vName: string, value: any) => {
    setInvoiceState({
      ...invoiceState,
      [vName]: value,
    });
  };

  const handleSalesInvoiceSettings = async (e: any) => {
    e.preventDefault();
    try {
      const url = ``;
      const apiResponse = await AddSalesInvoiceSettings(url, invoiceState);
      const { response, error } = apiResponse;
      if (!error && response) {
        toast.success(response.data);
      } else {
        toast.error(`API Error: ${error}`);
      }
    } catch (error) {
      toast.error(`Error during API call: ${error}`);
    }
  };

  return (
    <div className="m-4 pb-5 text-[#303F58] h-[100vh] overflow-scroll hide-scrollbar">
      <Banner />
      <p className="text-[20px] font-bold mt-3">Invoices</p>
      <form onSubmit={handleSalesInvoiceSettings} className="space-y-4 mt-2">
        <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              label="Allow editing of sent invoice"
              checked={invoiceState.invoiceEdit}
              onChange={(checked) =>
                handleInputChange("invoiceEdit", checked)
              }
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              label="Associate and display expenses receipts in invoice PDF"
              checked={invoiceState.displayExpenseReceipt}
              onChange={(checked) =>
                handleInputChange("displayExpenseReceipt", checked)
              }
            />
          </div>
        </div>

        {/* Invoice Order Number */}
        <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold">Invoice Order Number</p>
          <div className="flex gap-1 items-center mt-3">
          
              <RadioButton
                id="orderNum"
                name="salesOrderNumber"
                label="Use Sales Order Number"
                selected={invoiceState.salesOrderNumber}
                onChange={() =>
                  handleInputChange("salesOrderNumber", "orderNum")
                }
              />
         
          </div>
          <div className="flex gap-1 items-center mt-3">
            <RadioButton
              id="refNum"
              name="salesOrderNumber"
              label="Use Sales Order Reference Number"
              selected={ invoiceState.salesOrderNumber}
              onChange={() =>
                handleInputChange("salesOrderNumber", "refNum")
              }
            />
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold">Payments</p>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              label="Include Payment Receipt in Invoice"
              checked={invoiceState.paymentReceipt}
              onChange={(checked) =>
                handleInputChange("paymentReceipt", checked)
              }
            />
          </div>
        </div>

        <div className="bg-white w-full p-6 text-xs rounded-lg space-y-3">
          <p className="font-bold text-sm">Invoice QR Code</p>
          <div className="bg-[#FEFBF8] rounded-lg p-3 space-y-3">
            <p>
              Enable and configure the QR code you want to display on the PDF
              copy of an Invoice. Your customers can scan the QR code using
              their device to access the URL or other information that you
              configure.
            </p>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={invoiceState.invoiceQrCode}
                  onChange={(e) =>
                    handleInputChange("invoiceQrCode", e.target.checked)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-9 h-5 rounded-full shadow-inner transition-colors ${
                    invoiceState.invoiceQrCode
                      ? "bg-[#97998d]"
                      : "bg-[#97998d]"
                  }`}
                ></div>
                <div
                  className={`dot absolute w-3 h-3 bg-white rounded-full top-1 transition-transform ${
                    invoiceState.invoiceQrCode
                      ? "transform translate-x-full left-2"
                      : "left-1"
                  }`}
                ></div>
              </div>
              <div className="ml-2 text-textColor font-semibold text-sm">
                {invoiceState.invoiceQrCode ? "Enabled" : "Disabled"}
              </div>
            </label>
          </div>
          {invoiceState.invoiceQrCode && (
            <div className="grid grid-cols-12 items-center gap-3">
              <div className="relative col-span-4 text-xs">
                <label htmlFor="qrCodeType" className="text-slate-600">
                  QR Code Type
                </label>
                <div
                  onClick={() => setInvoiceURLDropdown(!invoiceURLDropdown)}
                  className="relative w-full mt-1 cursor-pointer"
                >
                  <p
                    id="qrCodeType"
                    className={`appearance-none w-full text-slate-600 bg-white text-sm h-[39px] pl-3 pr-8 rounded-sm leading-tight focus:outline-none border focus:bg-white ${
                      invoiceURLDropdown
                        ? "border-darkRed"
                        : "border-inputBorder"
                    } flex items-center`}
                  >
                    {invoiceState.invoiceQrType || "Invoice URL"}
                  </p>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>

                {/* Custom dropdown items */}
                {invoiceURLDropdown && (
                  <div className="absolute w-full mt-1 bg-white text-[#4B5C79] rounded-md shadow-lg z-10">
                    <div className="flex flex-col p-2 ">
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b flex border-b-inputBorder space-x-1"
                        onClick={() => {
                          handleInputChange("invoiceQrType", "UPI ID");
                          setInvoiceURLDropdown(!invoiceURLDropdown);
                        }}
                      >
                        <p className="mt-[2px]">
                          <WalletMinimal color="#4B5C79" size={16} />
                        </p>
                        <div className="flex flex-col">
                          <p className="font-medium text-slate-700 flex space-x-1 items-center">
                            UPI ID
                          </p>
                          <p className="text-xs text-slate-500">
                            UPI ID Will be displayed as QR code on invoices
                          </p>
                        </div>
                      </div>
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b flex border-b-inputBorder space-x-1"
                        onClick={() => {
                          handleInputChange("invoiceQrType", "Invoice URL");
                          setInvoiceURLDropdown(!invoiceURLDropdown);
                        }}
                      >
                        <p className="mt-[2px]">
                          <Link2 size={16} color="#4B5C79" />
                        </p>
                        <div className="flex flex-col">
                          <p className="font-medium text-slate-700 flex space-x-1 items-center">
                            Invoice URL
                          </p>
                        </div>
                      </div>
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b flex border-b-inputBorder space-x-1"
                        onClick={() => {
                          handleInputChange("invoiceQrType", "Custom");
                          setInvoiceURLDropdown(!invoiceURLDropdown);
                        }}
                      >
                        <p className="mt-[2px]">
                          <Link2 color="#4B5C79" size={16} />
                        </p>
                        <div className="flex flex-col">
                          <p className="font-medium text-slate-700 flex space-x-1 items-center">
                            Custom URL
                          </p>
                          <p className="text-xs text-slate-500">
                            Add Custom URL to the Invoice QR code
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='col-span-6'>
                <Input label="QR Code Description" placeholder="Enter Description"/>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white w-full p-6 text-xs rounded-lg space-y-3">
          <p className="font-bold text-sm">Zero-value line items</p>
          <div className="flex items-center space-x-2 mt-4">
          <Checkbox
              label="Hide zero-value line items"
              checked={invoiceState.zeroValue}
              onChange={(checked) =>
                handleInputChange("zeroValue", checked)
              }
            />
            <label>Hide zero-value line items</label>
          </div>
          <div className="bg-[#FEFBF8] rounded-lg p- space-y-3">
            <p>
              Choose whether you want to hide zero-value line items in an
              invoice's PDF and the Customer Portal. They will still be visible
              while editing an invoice. This setting will not apply to invoices
              whose total is zero.
            </p>
          </div>
        </div>

            {/* Terms & Condition */}
            <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-2">
          <p className="font-bold text-textColor text-sm">Terms & Conditions</p>
          <TextArea
            value={invoiceState.salesInvoiceTC}
            onChange={(e) =>
              handleInputChange("salesInvoiceTC", e.target.value)
            }
          />
          <p className="text-[12px] text-[#8F99A9]">
            Payment should be pay before due date
          </p>
        </div>

        {/* Customer Notes */}
        <div className="bg-white w-full p-6 text-[14px] rounded-lg space-y-2">
          <p className="font-bold text-textColor text-sm">Customer Notes</p>
          <TextArea
            value={invoiceState.salesInvoiceCN}
            onChange={(e) =>
              handleInputChange("salesInvoiceCN", e.target.value)
            }
          />
          <p className="text-[12px] text-[#8F99A9]">
            Thank you for your payment. You just made our day
          </p>
        </div>

        <div className="pt-4 flex justify-between">
          <Button
           
            type="submit"
          >Save</Button>
        </div>
      </form>
    </div>
  );
}

export default Invoices;
