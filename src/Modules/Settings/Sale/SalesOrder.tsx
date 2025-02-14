import toast from "react-hot-toast";
import useApi from "../../../Hooks/useApi";
import { useContext, useEffect, useState } from "react";
import Banner from "../Organization/Banner";
import Button from "../../../Components/Button";
import RadioButton from "../../../Components/Form/RadioButton";
import Checkbox from "../../../Components/Form/Checkbox";
import { settingsdataResponseContext } from "../../../Context/ContextShare";
import { endpoints } from "../../../Services/apiEdpoints";

type Props = {};

function SalesOrder({}: Props) {
  const { request: AddSalesOrderSettings } = useApi("put",5007);
  const {settingsResponse, getSettingsData } = useContext(settingsdataResponseContext)!;
  const [salesOrderState, setSalesOrderState] = useState({
    salesOrderAddress: false,
    salesOrderCustomerNote: false,
    salesOrderTermsCondition: false,
    salesOrderClose: "invoice",
    restrictSalesOrderClose: false,
    termCondition: "",
    customerNote: "",
  });

  // Generic function to handle input changes
  const handleInputChange = (field: string, value: any) => {
    setSalesOrderState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };


  const handleSalesOrderSettings = async (e: any) => {
    e.preventDefault();
    try {
      const url = `${endpoints.ADD_SALES_SETTINGS}`;
      const apiResponse = await AddSalesOrderSettings(url,salesOrderState)
      const { response, error } = apiResponse;
      if (!error && response) {
        toast.success(response.data);
        // console.log(response.data,"res")
      } else {
        console.log(error,"res")

        toast.error(error.response.data);
      }
    } catch (error) {
      toast.error(`Error during API call: ${error}`);
    }
  };

  
  useEffect(() => {
    getSettingsData();
  }, []); 
  
  useEffect(() => {
    if (settingsResponse) {
      setSalesOrderState((prevData) => ({
        ...prevData,
        ...settingsResponse?.data?.salesOrderSettings,
      }));
    }
  }, [settingsResponse]);
  console.log(settingsResponse?.data);
  
  return (
    <div className="p-5 text-text_tertiary h-[100vh] overflow-scroll hide-scrollbar">
      <Banner />
      <p className="font-bold my-3">Sales Order</p>
      <form onSubmit={(e) => handleSalesOrderSettings(e)}>
        <div className=" p-6 rounded-lg bg-white">
          <p className="font-semibold text-dropdownText text-sm mb-3">
            Which of the following fields of Sales Orders do you want to update in
            the respective Invoices?
          </p>
          <div className="flex flex-col space-y-3">
            <Checkbox
              label="Address"
              checked={salesOrderState.salesOrderAddress}
              onChange={(checked) =>
                handleInputChange("salesOrderAddress", checked)
              }
            />
            <Checkbox
              label="Customer Notes"
              checked={salesOrderState.salesOrderCustomerNote}
              onChange={(checked) =>
                handleInputChange("salesOrderCustomerNote", checked)
              }
            />
            <Checkbox
              label="Terms & Conditions"
              checked={salesOrderState.salesOrderTermsCondition}
              onChange={(checked) =>
                handleInputChange("salesOrderTermsCondition", checked)
              }
            />
          </div>
        </div>

        {/* Radio Buttons for Sales Order Closure */}
        <div className="mt-4 p-6 rounded-lg bg-white">
          <p className="font-semibold text-dropdownText text-sm mb-3">
            When do you want your Sales Orders to be closed?
          </p>
          <div className="flex flex-col space-y-3 items-start">
            <RadioButton
              id="invoice"
              name="salesOrderClose"
              label="When invoice is created"
              selected={salesOrderState.salesOrderClose}
              onChange={() => handleInputChange("salesOrderClose", "invoice")}
            />
            <RadioButton
              id="shipment"
              name="salesOrderClose"
              label="When shipment is fulfilled"
              selected={salesOrderState.salesOrderClose}
              onChange={() => handleInputChange("salesOrderClose", "shipment")}
            />
            <RadioButton
              id="shipmentInvoice"
              name="salesOrderClose"
              label="When shipment is fulfilled and invoice is created"
              selected={salesOrderState.salesOrderClose}
              onChange={() =>
                handleInputChange("salesOrderClose", "shipmentInvoice")
              }
            />
            <Checkbox
              label="Restrict closed sales orders from being edited"
              checked={salesOrderState.restrictSalesOrderClose}
              onChange={(checked) =>
                handleInputChange("restrictSalesOrderClose", checked)
              }
            />
          </div>
        </div>

        <div className="mt-4 p-6 rounded-lg bg-white">
          <p className="font-bold text-textColor text-sm mb-3">Terms & Conditions</p>
          <textarea
            className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
            value={salesOrderState.termCondition}
            onChange={(e) =>
              handleInputChange("termCondition", e.target.value)
            }
          />
        </div>

        <div className="mt-4 p-6 rounded-lg bg-white">
          <p className="font-bold text-textColor text-sm mb-3">Customer Notes</p>
          <textarea
            className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
            value={salesOrderState.customerNote}
            onChange={(e) =>
              handleInputChange("customerNote", e.target.value)
            }
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 flex justify-end">
          <Button type="submit" size="sm" className="text-sm  pl-10 pr-10">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SalesOrder;
