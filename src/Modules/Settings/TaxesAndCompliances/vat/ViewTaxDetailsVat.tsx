import Modal from "../../../../Components/modal/Modal";

type TaxRate = {
  _id: string;
  TaxName: string;
  Rate: string;
};

type Props = {
  vatRate: TaxRate | null;
  open: boolean;
  onClose: () => void;
};

function ViewTaxDetailsVat({ vatRate, open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} className="w-[45.4%] px-8 py-6">
      <div>
        <p className="text-[#303F58] font-bold">VAT Details</p>
        {vatRate ? (
          <div className="mt-4">
            <p><strong>Tax Name:</strong> {vatRate.TaxName}</p>
            <p><strong>Rate:</strong> {vatRate.Rate}</p>
          </div>
        ) : (
          <p>No details available</p>
        )}
      </div>
    </Modal>
  );
}

export default ViewTaxDetailsVat;
