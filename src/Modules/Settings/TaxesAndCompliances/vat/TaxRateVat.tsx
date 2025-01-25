import { useState } from "react";
import CirclePlus from "../../../../assets/icons/circleplus";
import Button from "../../../../Components/Button";
import Table from "../../../../Components/Table/Table";
import ViewTaxDetailsVat from "./ViewTaxDetailsVat";

type Props = {};

function TaxRateVat({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVatRate, setSelectedVatRate] = useState(null); // Store the selected VAT rate

  const dummyColumns = [
    { id: "TaxName", label: "Tax Name ", visible: true },
    { id: "Rate", label: "Rate(%)", visible: true },
  ];

  const dummyData = [
    { _id: "1", TaxName: "VAT 0", Rate: "0%" },
    { _id: "2", TaxName: "VAT 1", Rate: "5%" },
    { _id: "3", TaxName: "VAT 2", Rate: "10%" },
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVatRate(null); // Clear the selected data when closing
  };

  const handleEyeClick = (id: string) => {
    const selectedData = dummyData.find((item) => item._id === id); // Find the selected row
    if (selectedData) {
      setSelectedVatRate(selectedData); // Set the selected data
      setModalOpen(true); // Open the modal
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[#303F58] font-bold">Tax Rate</p>
        <div className="flex gap-4">
          <Button onClick={openModal} className="text-sm font-medium" size="sm">
            <CirclePlus color="white" /> New Tax
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <Table
          columns={dummyColumns}
          data={dummyData}
          searchPlaceholder={"Search Taxes"}
          searchableFields={["TaxName"]}
          loading={false}
          onRowClick={handleEyeClick} // Pass the row click handler
        />
      </div>

      <ViewTaxDetailsVat vatRate={selectedVatRate} open={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default TaxRateVat;
