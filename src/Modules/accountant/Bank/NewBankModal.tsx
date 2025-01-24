import { useState } from "react";
import Button from "../../../Components/Button"
import Modal from "../../../Components/modal/Modal";
import Input from "../../../Components/Form/Input";
import accountsBgImage from "../../../assets/images/bankBgImage.png"
import Select from "../../../Components/Form/Select";
import CirclePlus from "../../../assets/icons/circleplus";

type Props = {}

function NewBankModal({}: Props) {
      const [isModalOpen, setModalOpen] = useState(false);
    
      const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      }
    
  return (
    <div>
        <Button onClick={openModal}>
        <CirclePlus />
        <p> Create Account</p>
      </Button>

      <Modal open={isModalOpen} onClose={closeModal} className="w-[649px] text-start px-7 py-6">
        <div className="flex justify-between items-center">
          <p className="text-heading font-bold text-lg">Add New Account</p>
          <span onClick={closeModal} className="text-3xl font-light cursor-pointer">&times;</span>
        </div>
        <div
          className="mt-4 p-6 rounded-2xl flex justify-between items-center relative bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${accountsBgImage})`,
          }}
        >
          <div className="relative flex-1">
            <p className="text-[#004D4D] font-bold text-base">Account Details</p>
            <p className="text-text_tertiary text-xs mt-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>


        <div className="mt-4 bg-[#FAF7F2] p-4 rounded-2xl text-text_tertiary text-sm">
          <form>
            <p className="mb-2">Name</p>
            <Input placeholder="Enter Your name" />

            <div className="mt-4 flex items-center justify-between w-full">
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">Account Code</label>
                <Input
                  placeholder="Enter code"
                />
              </div>

              <div className="flex flex-col w-[48%]">
                <label className="mb-1">Account Number</label>
                <Input
                  placeholder="Enter account number"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between w-full">
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">IFSC Code</label>
                <Input
                  placeholder="Enter IFSC code"
                />
              </div>

              <div className="flex flex-col w-[48%]">
                <label className="mb-1">Currency</label>
                <Select
                  options={[]}
                  placeholder="Select currency"
                />
              </div>
            </div>


            <div className="mt-4">
              <p className="mb-2">Description</p>
              <Input placeholder="Enter Description" size="lg" />

            </div>


          </form>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={closeModal} variant="secondary" className="text-sm font-semibold">
            Cancel
          </Button>
          <Button>save</Button>
        </div>


      </Modal>
    </div>
  )
}

export default NewBankModal