import  { useState } from 'react'
import Modal from '../../../Components/modal/Modal'
import Button from '../../../Components/Button'
import Input from '../../../Components/Form/Input'
import CirclePlus from '../../../assets/icons/CirclePlus'

type Props = {}

function AddPlans({}: Props) {
      const [isModalOpen, setModalOpen] = useState(false);
    

    const closeModal = () => {
        setModalOpen(false);
       
      };
  const openModal = () => {
   
    setModalOpen(true);
  };
  return (
    <div>
        <Button onClick={openModal}>
    <CirclePlus />
    Add Membership
  </Button>
        
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="w-[40%] text-start px-7 py-6 bg-[#f2f1ed]"
      >
        <div className="flex items-center justify-between py-1 rounded-xl">
          <p className="font-bold">Add Membership Plans</p>
          <div className="flex gap-2 items-center">
            <button
              onClick={closeModal}
              className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1"
            >
              &times;
            </button>
          </div>
        </div>
        <div className=" gap-4 mt-1">
        <Input placeholder='Enter Name' />
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
  )
}

export default AddPlans