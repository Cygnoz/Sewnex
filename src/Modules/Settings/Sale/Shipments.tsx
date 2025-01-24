// import bgimage from "../../../../assets/Images/Organization-banner.png";
import React from "react";
import Button from "../../../Components/Button";
import Checkbox from "../../../Components/Form/Checkbox";
import Banner from "../Organization/Banner";
// import AddAddress from "./AddAddress";

type Props = {};

function Shipments({}: Props) {
  const [shipmentPreferences, setShipmentPreferences] = React.useState({
    carrierShipments: false,
    manualShipments: false,
  });

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setShipmentPreferences((prev) => ({ ...prev, [field]: checked }));
  };

  return (
    <div className="text-text_tertiary">
      <Banner />
      <div
        className="w-full bg-cover bg-center rounded-lg"
        // style={{ backgroundImage: `url(${bgimage})` }}
      />
      <p className="font-bold my-3">Shipments</p>

      {/* Shipment Notification Section */}
      <div className="p-6 rounded-lg bg-white">
        <p className="font-semibold text-dropdownText text-sm mb-3">
          Shipment Notification
        </p>

       <div className="space-y-1">
          <Checkbox
            label="Do you want to send notifications to customers for carrier shipments?"
            checked={shipmentPreferences.carrierShipments}
            onChange={(checked) => handleCheckboxChange("carrierShipments", checked)}
          />
  
          <Checkbox
            label="Do you want to send notifications to customers for manual shipments?"
            checked={shipmentPreferences.manualShipments}
            onChange={(checked) => handleCheckboxChange("manualShipments", checked)}
          />
       </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <Button size="sm" className="text-sm pl-10 pr-10">
          Save
        </Button>
      </div>
    </div>
  );
}

export default Shipments;
