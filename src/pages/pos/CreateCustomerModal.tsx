import { useState } from "react"
import Modal from "../../Components/modal/Modal"
import Input from "../../Components/Form/Input"
import Button from "../../Components/Button"
import PlusCircle from "../../assets/icons/Plus"

const CreateCustomerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    salutation: "Mr.",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    email: "",
    membershipCardNumber: "",
    workPhone: "",
    mobile: "",
  })

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    console.log("Saving new customer:", formData)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button className="text-xs h-[32px]" onClick={() => setIsModalOpen(true)}>
        <PlusCircle color="white" /> Create Customer
      </Button>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} align="center">
          <div className="p-4 w-full">
            <h2 className="text-2xl font-bold mb-2">Create New Customer</h2>
            <p className="text-gray-500 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p>

            {/* First row - 3 columns */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label htmlFor="salutation" className="text-sm font-medium text-gray-700 mb-3">
                  Salutation
                </label>
                <select
                  id="salutation"
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleInputChange}
                  className="form-select w-full border border-gray-300 focus:outline-none rounded-3xl h-9 py-2 px-3 text-xs sm:text-sm "
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
              />

              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
              />
            </div>

            {/* Remaining rows - 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter Company"
              />

              <Input
                label="Customer Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Enter Display Name"
              />

              <Input
                label="Customer Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
              />

              <Input
                label="Membership Card Number"
                name="membershipCardNumber"
                value={formData.membershipCardNumber}
                onChange={handleInputChange}
                placeholder="XXX"
              />

              <Input
                label="Work Phone"
                name="workPhone"
                value={formData.workPhone}
                onChange={handleInputChange}
                placeholder="Enter Work Phone"
              />

              <Input
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter Mobile Number"
              />
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CreateCustomerModal

