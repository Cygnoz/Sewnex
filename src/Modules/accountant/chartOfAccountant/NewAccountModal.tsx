import { useState } from "react";
import Button from "../../../Components/Button"
import Modal from "../../../Components/modal/Modal"
import accountsBgImage from "../../../assets/images/accountsBgIMage.png"
import Input from "../../../Components/Form/Input";
import Select from "../../../Components/Form/Select";
import CheveronDown from "../../../assets/icons/CheveronDown";
import CirclePlus from "../../../assets/icons/circleplus";

type Props = {}

function NewAccountModal({ }: Props) {
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
        <p> New Account</p>
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
                <label className="mb-1">Account type</label>
                <Select
                  options={[]}
                  placeholder="cash"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                className="accent-[#97998E] cursor-pointer w-5 h-5 mx-1 my-1"
                id="checkbox3"
              />
              <label
                htmlFor="checkbox3"
                className="text-sm ms-1 font-medium cursor-pointer"
              >
                Make this a sub-account
              </label>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-labelColor text-sm">Opening Balance</label>
              <div className="flex">
                <div className="relative w-24 ">
                  <select
                    className="block appearance-none cursor-pointer w-full h-9 text-[#818894] bg-white border border-borderColor 
                                   text-sm pl-3.5 pr-2 rounded-l-full leading-tight 
                                   focus:outline-none"
                    name="openingType"
                  >
                    <option value="Debit">Dr</option>
                    <option value="Credit">Cr</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>
                <input
                  type="number"
                  min={0}
                  className="text-sm w-[100%] rounded-r-full text-start bg-white border border-borderColor h-9 py-2 px-3 focus:outline-none"
                  placeholder="Enter Opening Balance"
                  name="openingBalance"
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

export default NewAccountModal