import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import RadioButton from "../../../Components/Form/RadioButton";
import Banner from "../Organization/Banner";
import TextArea from "../../../Components/Form/TextArea";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
import toast from "react-hot-toast";
import { endpoints } from "../../../Services/apiEdpoints";

type Props = {};

const PurchaseOrders = ({}: Props) => {
  const initialPurchaseOrder = {
    purchaseOrderClose: "",
    purchaseTC: "",
    purchaseNote: "",
  };

  const [purchaseOrderData, setPurchaseOrderData] = useState(initialPurchaseOrder);

  const { request: fetchPurchaseOrderSettings } = useApi("get", 5004);
  const { request: savePurchaseOrderSettings } = useApi("put", 5005);

  useEffect(() => {
    const fetchAllSettings = async () => {
      try {
        const url = `${endpoints.GET_SETTINGS}`;
        const { response, error } = await fetchPurchaseOrderSettings(url);

        if (!error && response) {
          const settings = response.data.purchaseOrderSettings;
          setPurchaseOrderData({
            purchaseOrderClose: settings.purchaseOrderClose || "",
            purchaseTC: settings.purchaseTC || "",
            purchaseNote: settings.purchaseNote || "",
          });
        } else {
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error fetching purchase order settings:", error);
      }
    };

    fetchAllSettings();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setPurchaseOrderData((prevData) => ({
      ...prevData,
      purchaseOrderClose: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${endpoints.ADD_PURCHASE_ORDER_SETTINGS}`;
      const { response, error } = await savePurchaseOrderSettings(url, purchaseOrderData);
      if (!error && response) {
        toast.success("Purchase order settings saved successfully!");
      } else {
        toast.error("Failed to save purchase order settings.");
      }
    } catch (error) {
      console.error("Error saving purchase order settings:", error);
      toast.error("An error occurred while saving the settings.");
    }
  };

  return (
    <div className="h-[100vh] overflow-scroll hide-scrollbar">
      <Banner />
      <div className="my-2">
        <p className="font-bold text-text_primary">Purchase Orders</p>

        <div className="p-2 rounded-lg bg-white w-[221px]">
          <div className="flex bg-[#f7ecda] gap-2 items-center justify-center p-2 rounded-lg">
            <SettingsIcon color="#3c424f" strokeWidth="3" />
            <p className="text-text_tertiary font-semibold">General</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Closure Option */}
          <div className="bg-white my-4 p-5 rounded-xl text-sm">
            <p className="font-bold text-text_tertiary">When do you want your purchase orders to be closed?</p>
            <div className="flex flex-col items-start space-y-2 mt-2">
              <RadioButton
                id="When a Purchase Receive is recorded"
                label="When a Purchase Receive is recorded"
                name="purchaseOrderClose"
                selected={purchaseOrderData.purchaseOrderClose}
                onChange={handleRadioChange}
              />
              <RadioButton
                id="When a Bill is created"
                label="When a Bill is created"
                name="purchaseOrderClose"
                selected={purchaseOrderData.purchaseOrderClose}
                onChange={handleRadioChange}
              />
              <RadioButton
                id="When Receives and Bills are recorded"
                label="When Receives and Bills are recorded"
                name="purchaseOrderClose"
                selected={purchaseOrderData.purchaseOrderClose}
                onChange={handleRadioChange}
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white my-4 p-5 rounded-xl text-sm">
            <p className="font-bold text-text_tertiary">Terms & Conditions</p>
            <TextArea
              name="purchaseTC"
              value={purchaseOrderData.purchaseTC}
              onChange={handleChange}
            />
          </div>

          {/* Notes */}
          <div className="bg-white my-4 p-5 rounded-xl text-sm">
            <p className="font-bold text-text_tertiary">Notes</p>
            <TextArea
              name="purchaseNote"
              value={purchaseOrderData.purchaseNote}
              onChange={handleChange}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrders;
