import Button from "../../../../Components/Button";
import Modal from "../../../../Components/modal/Modal";
import accountsBgImage from "../../../../assets/images/bankBgImage.png";


type Props = {
  gstRate: any | null;
  open: boolean;
  onClose: () => void;
};

function ViewTaxDetails({ gstRate, open, onClose }: Props) {
  return (
    <div>
        <Modal open={open} onClose={onClose} className="w-[45.4%] px-8 py-6">
        <div
          className="mt-4 p-6 rounded-2xl flex justify-between items-center relative bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${accountsBgImage})`,
          }}
        >
        <div className="relative flex-1">
          <p className="text-[#004D4D] font-bold text-base">Veiw Tax</p>
          <p className="text-text_tertiary text-xs mt-2">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
      <div className="mt-4 bg-[#FAF7F2] p-4 rounded-2xl text-text_tertiary text-sm">
        <p>
          Tax Name{" "}
          <span className="ms-2 font-bold text-base text-[#303F58]">
            {gstRate?.taxName}
          </span>
        </p>
        <p className="mt-2.5">
          Rate(%){" "}
          <span className="ms-5 font-bold text-base text-[#303F58]">
            {gstRate?.taxRate}
          </span>
        </p>
        <p className="mt-2.5">
          CGST{" "}
          <span className="ms-8 font-bold text-base text-[#303F58]">
            {gstRate?.cgst}
          </span>
        </p>
        <p className="mt-2.5">
          SGST{" "}
          <span className="ms-8 font-bold text-base text-[#303F58]">
            {gstRate?.sgst}
          </span>
        </p>
        <p className="mt-2.5">
          IGST{" "}
          <span className="ms-10 font-bold text-base text-[#303F58]">
            {gstRate?.igst}
          </span>
        </p>
      </div>
      <Button onClick={onClose} variant="secondary" className="text-sm mt-6 ms-auto">
        Cancel
      </Button>
    </Modal>
    </div>
  )
}

export default ViewTaxDetails