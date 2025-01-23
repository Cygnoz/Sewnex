import { useState } from "react";
import CirclePlus from "../../../assets/icons/CirclePlus";
import Modal from "../../../Components/modal/Modal";

type Props = {};

function BillingModal({}: Props) {
  const [isOpen, setIsOpen] = useState({
    main: false,
    add: false,
    edit: false,
  });

  // Handle modal open/close
  const closeModal = (main: boolean, add: boolean, edit: boolean) => {
    setIsOpen({ main: main, edit: edit, add: add });
  };

  const openModal = (main: boolean, add: boolean, edit: boolean) => {
    setIsOpen({ main: main, edit: edit, add: add });
  };

  return (
    <div>
      <div onClick={() => openModal(true, false, false)}>
        <CirclePlus color={"#004D4D"} />
      </div>

      <Modal
        open={isOpen.main}
        onClose={() => closeModal(false, false, false)}
        className="w-[35%] max-h-[100%]" // Decrease width and limit height
      >
        <div className="flex justify-start gap-8  bg-[#FFFFFF] p-2 rounded-lg shadow-md  overflow-y-auto  max-h-[95vh]">
          {/* Contact Section */}
          <div className="">
            <h2 className="text-lg font-bold mb-4 ms-5">Contact</h2>
            <div className="space-y-3">
              {[
                "Display Name",
                "Company Name",
                "Website",
                "Salutation",
                "First Name",
                "Last Name",
                "Contact Email",
                "Mobile Phone",
                "Phone Label",
                "Phone",
                "Department",
                "Designation",
                "PAN Label",
                "PAN",
                "GSTIN Label",
                "GSTIN",
              ].map((label) => (
                <div key={label}>
                  <label className="py-2 px-6 block text-sm font-normal text-[#303F58] hover:bg-[#E6EDED]">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h2 className="text-lg font-bold mb-4 ms-5" >Address</h2>
            <div className="space-y-3">
              {[
                "Attention",
                "Street Address",
                "Street Address 1",
                "Street Address 2",
                "City",
                "State/Province",
                "Country",
                "Zip/Postal Code",
                "Fax Label",
                "Phone",
                "Fax",
              ].map((label) => (
                <div key={label}>
                 <label className="py-2 px-6 block text-sm font-normal text-[#303F58] hover:bg-[#E6EDED]">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BillingModal;
