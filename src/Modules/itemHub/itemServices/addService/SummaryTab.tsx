import { useState } from "react";
import Checkbox from "../../../../Components/Form/Checkbox"
import Input from "../../../../Components/Form/Input"
import Select from "../../../../Components/Form/Select"
import Modal from "../../../../Components/modal/Modal";
import EditIcon from "../../../../assets/icons/EditIcon";
import defaultCategoryImage from "../../../../assets/images/defaultCategoryImage.png";
import Button from "../../../../Components/Button";

type Props = {}

function SummaryTab({ }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <p className="text-[#0B1320] font-bold text-base">Service Summary</p>
      <div className="mt-4 bg-white py-5 px-6 rounded-2xl">
        <div className="bg-[#F8F8F8] rounded-lg py-[14px] px-4 flex gap-10">
          <p className="text-[#495160] font-medium text-[11px]">Category
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">ORD1200</p>
          </p>
          <p className="text-[#495160] font-medium text-[11px]">Service Name
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">Shirt Stitching</p>
          </p>
          <p className="text-[#495160] font-medium text-[11px]">Unit
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">Pcs</p>
          </p>
          <p className="text-[#495160] font-medium text-[11px]">HSN/SAC Code
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">0SDF00234</p>
          </p>
        </div>
        <p className="text-[#0B1320] font-bold text-sm mt-2">Parameter</p>
        {/*  */}
        <p className="text-[#0B1320] font-bold text-sm mt-2">Style</p>

        <div className="mt-2 flex items-center justify-start">
          <div className="bg-[#F8F8F8] rounded-lg py-[10px] px-[14px] flex justify-between items-center gap-12">
            <div className="flex gap-4 items-center">
              <img src={defaultCategoryImage} className="w-6 h-6 rounded-full object-cover" alt="" />
              <p className="text-[#0B1320] text-xs font-bold">Patch Pocket</p>
            </div>
            <p className="text-[#0B1320] text-xs font-bold">₹300</p>
            <div className="cursor-pointer" onClick={openModal}>
              <EditIcon color="#495160" />
            </div>
          </div>

          <Modal open={isModalOpen} onClose={closeModal} className="p-6 bg-white rounded-2xl w-[27%]">
            <div className="flex items-center justify-between py-1 rounded-xl">
              <p className="font-bold">Edit item</p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={closeModal}
                  className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <img src={defaultCategoryImage} className="w-8 h-8 object-cover rounded-full" alt="" />
              <div>
                <p className="text-[#495160] text-xs">Style</p>
                <p className="text-[#0B1320] font-semibold text-sm">Patch Pocket</p>
              </div>
              <p className="text-[#495160] text-sm font-semibold">₹300.00</p>
            </div>
            <div className="mt-4">
              <Input
                label="Rate"
                placeholder="0.00"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                onClick={closeModal}
                variant="secondary"
                className="text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button >Save</Button>
            </div>
          </Modal>
        </div>


        <div className="flex justify-end">
          <p className="text-[#495160] font-bold text-sm">Style Total:  <span className="text-[#0B1320] ms-5 font-bold text-base">₹500.00</span></p>
        </div>
        <div className="mt-3 flex justify-between gap-4">
          <div className="w-[50%]">
            <Select
              placeholder="Select"
              label="Tax"
              options={[]}
            />
          </div>
          <div className="w-[50%]">
            <Input
              placeholder="Enter"
              label="Service"
            />
          </div>
        </div>

        <div className="flex mt-4 gap-6">
          <div className="flex items-center gap-1 text-textColor">
            <Checkbox
              id="checkbox3"
              name="Inclusive"
              className="w-5 h-5 mx-1 my-1 mt-1.5"
            />
            <label
              htmlFor="checkbox3"
              className="text-[#495160] text-sm font-semibold cursor-pointer"
            >
              Inclusive
            </label>
          </div>
          <div className="flex items-center gap-1 text-textColor">
            <Checkbox
              id="checkbox"
              name="Exclusive"
              className="w-5 h-5 mx-1 my-1 mt-1.5"
            />
            <label
              htmlFor="checkbox"
              className="text-[#495160] text-sm font-semibold cursor-pointer"
            >
              Exclusive
            </label>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <div>
            <p className="text-[#495160] font-bold text-sm">
              Style Amount:
              <span className="text-[#0B1320] ms-5 font-bold text-base">₹500.00</span>
            </p>
            <p className="text-[#495160] font-bold text-sm">
              Service Amount:
              <span className="text-[#0B1320] ms-5 font-bold text-base">₹500.00</span>
            </p>
            <p className="text-[#495160] font-bold text-sm">
              Total:
              <span className="text-[#0B1320] ms-5 font-bold text-base">₹500.00</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SummaryTab