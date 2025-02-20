import { useState } from "react";
import Modal from "../../../Components/modal/Modal";
import Button from "../../../Components/Button";
import Input from "../../../Components/Form/Input";
import CirclePlus from "../../../assets/icons/CirclePlus";
import RadioButton from "../../../Components/Form/RadioButton";
import CheveronDown from "../../../assets/icons/CheveronDown";
import Checkbox from "../../../Components/Form/Checkbox";

type Props = {};

interface Service {
  serviceId: string;
  price: string;
  count: string;
  total: string;
}

interface MembershipPlan {
  planName: string;
  description: string;
  planType: string;
  discount: string;
  discountAmount: string;
  duration: string;
  services: Service[];
  actualRate: string;
  sellingRate: string;
}

const initialMembershipPlan: MembershipPlan = {
  planName: "",
  description: "",
  planType: "",
  discount: "",
  discountAmount: "",
  duration: "",
  services: [],
  actualRate: "",
  sellingRate: "",
};

function AddPlans({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState<string>("");
  const [discountApplication, setdiscountApplication] = useState("");
  const [inputData, setInputData] = useState(initialMembershipPlan);
  const [isExpand, setIsExpand] = useState(false);
  const dummyServices = [
    {
      serviceId: "65d1234567890abcdef12345",
      price: 100,
      count: 2,
      total: 200,
      image: "https://i.postimg.cc/nL5mDzK7/963188-12541739.avif",
      name: "shirt",
    },
    {
      serviceId: "65d1234567890abcdef12346",
      price: 150,
      count: 3,
      total: 450,
      image: "https://i.postimg.cc/nL5mDzK7/963188-12541739.avif",
      name: "shirt",
    },
    {
      serviceId: "65d1234567890abcdef12347",
      price: 200,
      count: 1,
      total: 200,
      image: "https://i.postimg.cc/nL5mDzK7/963188-12541739.avif",
    },
    {
      serviceId: "65d1234567890abcdef12348",
      price: 250,
      count: 4,
      total: 1000,
      image: "https://i.postimg.cc/nL5mDzK7/963188-12541739.avif",
    },
    {
      serviceId: "65d1234567890abcdef12349",
      price: 300,
      count: 5,
      total: 1500,
      image: "https://i.postimg.cc/nL5mDzK7/963188-12541739.avif",
    },
  ];

  console.log(dummyServices);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const handleExpand = () => {
    setIsExpand((prev) => !prev);
  };

  const handleInputChange = (name: string, value: string | boolean | File) => {
    setInputData((prevData) => ({
      ...prevData,
      [name]: value instanceof File ? URL.createObjectURL(value) : value,
    }));
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
        className="w-[50%] text-start px-7 py-6 bg-[#f2f1ed]"
      >
        <div className="flex items-center justify-between py-1 rounded-xl">
          <p className="font-bold">Add Membership Plans</p>
          <button
            onClick={closeModal}
            className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1"
          >
            &times;
          </button>
        </div>

        <div className="gap-4 mt-1 bg-[#f2f1ed] p-3 rounded-lg h-[75vh] overflow-y-scroll hide-scrollbar">
          <Input
            label="Plan Name"
            name="planName"
            placeholder="Enter Name"
            value={inputData.planName}
            onChange={(e) => handleInputChange("planName", e.target.value)}
          />
          <Input
            label="Description"
            name="description"
            placeholder="Enter Description"
            value={inputData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <p className="text-text_primary text-xs font-semibold my-3">
            Select Plan Type
          </p>
          <div className="flex gap-3 mb-3">
            <div
              className={`flex gap-2 items-center bg-white p-2 w-[30%] rounded-lg cursor-pointer ${
                type === "Currency" ? "border " : ""
              }`}
              id="Currency"
              onClick={() => {
                handleInputChange("planType", "Currency");
                setType("Currency");
              }}
            >
              <p className="text-text_primary">%</p>
              <p className="text-xs text-text_primary">Count</p>
              <div className="ml-auto">
                <RadioButton
                  id="Currency"
                  name="planType"
                  label=""
                  selected={type}
                  onChange={() => {
                    handleInputChange("planType", "Currency");
                    setType("Currency");
                  }}
                  className="text-base text-[#495160] font-semibold cursor-pointer"
                />
              </div>
            </div>

            <div
              className={`flex gap-2 items-center bg-white p-2 w-[30%] rounded-lg cursor-pointer ${
                type === "Percentage" ? "" : ""
              }`}
              onClick={() => {
                handleInputChange("planType", "Percentage");
                setType("Percentage");
              }}
            >
              <p className="text-text_primary">%</p>
              <p className="text-xs text-text_primary" id="Percentage">
                Discount
              </p>
              <div className="ml-auto">
                <RadioButton
                  id="Percentage"
                  name="planType"
                  label=""
                  selected={type}
                  onChange={() => {
                    handleInputChange("planType", "Percentage");
                    setType("Percentage");
                  }}
                  className="text-base text-[#495160] font-semibold cursor-pointer"
                />
              </div>
            </div>
          </div>

          {inputData.planType === "Percentage" && (
            <Input
              label="Discount %"
              placeholder="Enetr Discount"
              value={inputData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
            />
          )}

          <Input
            label="Duration"
            placeholder="Enetr Duration"
            value={inputData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />

          <p className="text-text_primary text-xs font-semibold mt-3">
            Discount is Applicable for
          </p>

          <div className="flex items-start gap-[22px] text-[#495160] mt-2">
            <div className="flex items-center">
              <RadioButton
                id="GST"
                name="taxType"
                label=""
                selected={discountApplication}
                onChange={() => {
                  handleInputChange("planType", "Percentage");
                  setdiscountApplication("Percentage");
                }}
                className="text-base text-[#495160] font-semibold cursor-pointer"
              />
              <p className="text-xs">All Services</p>
            </div>
            <div className="flex items-center">
              <RadioButton
                id="VAT"
                name="taxType"
                label=""
                selected={discountApplication}
                onChange={() => {
                  handleInputChange("planType", "Percentage");
                  setdiscountApplication("Percentage");
                }}
                className="text-base text-[#495160] font-semibold cursor-pointer"
              />
              <p className="text-xs">Selected Services</p>
            </div>
          </div>

          <p className="text-text_primary text-xs font-semibold my-3">
            Select Service
          </p>
          <div className="flex gap-2  ">
            {dummyServices.map((service) => (
              <div className="relative bg-white rounded-lg text-center items-center justify-center p-3 w-[132px] ">
                {/* Image Centered */}
                <div className="flex items-center justify-center">
                  <img
                    src={service.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                </div>

                <div className="absolute top-2 right-2">
                  <Checkbox />
                </div>

                <p className="text-center font-semibold">{service.name}</p>
                <p className="text-xs text-text_tertiary mt-3">Price</p>
                <p className="text-text_fourthiry font-semibold">$200</p>
              </div>
            ))}
          </div>
          {inputData.planType === "Currency" && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Actual Rate"
                name="actualRate"
                placeholder="Enter Rate"
                value={inputData.actualRate}
                onChange={(e) =>
                  handleInputChange("actualRate", e.target.value)
                }
              />
              <Input
                label="Selling Rate"
                name="sellingRate"
                placeholder="Enter Rate"
                value={inputData.sellingRate}
                onChange={(e) =>
                  handleInputChange("sellingRate", e.target.value)
                }
              />
            </div>
          )}

          <div className="bg-white text-xs rounded-lg text-text_primary p-3 mt-3">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-7 space-y-2">
                {" "}
                <p> Plan Name</p>
                <p className="font-semibold text-text_fourthiry">
                  Silver Plan - Discount Based
                </p>
              </div>
              <div className="col-span-2 space-y-2">
                {" "}
                <p> Plan Type</p>
                <p className="font-semibold text-text_fourthiry">Discount</p>
              </div>
              <div className="col-span-2 space-y-2 ">
                {" "}
                <p>Duration</p>
                <p className="font-semibold text-text_fourthiry">3 Months</p>
              </div>
              <div className="col-span-1 space-y-2 flex items-center justify-center">
                <button onClick={handleExpand}>
                  <CheveronDown
                    color="black"
                    className={`transform transition-transform duration-300 ${
                      isExpand ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
            </div>
            {isExpand && (
              <div className="text-text_primary mt-2">
                <p className="font-semibold mt-3 mb-1">Desccription</p>
                <p>
                  This membership includes a limited number of uses for selected
                  services over the plan duration
                </p>
                <div className="flex items-end justify-end my-2 pt-2 mx-2 border-b border-r-text_secondary">
                  <table className="w-[70%]">
                    <tr className="text-xs font-normal pb-2 ">
                      <th className="font-normal text-end">Service</th>
                      {inputData.planType === "Currency" && (
                        <th className="font-normal text-end">Count</th>
                      )}{" "}
                      <th className="font-normal text-end">Unit Price</th>
                      {inputData.planType === "Currency" && (
                        <th className="font-normal text-end">Sub Total</th>
                      )}
                    </tr>
                    <tbody>
                      <tr>
                        <td className="font-semibold text-end">Shirt </td>
                        {inputData.planType === "Currency" && (
                          <td className="font-semibold text-end">4 </td>
                        )}
                        <td className="font-semibold text-end">400 </td>
                        {inputData.planType === "Currency" && (
                          <td className="font-semibold text-end">16000 </td>
                        )}
                      </tr>
                      <tr>
                        <td className="font-semibold text-end">Shirt </td>
                        {inputData.planType === "Currency" && (
                          <td className="font-semibold text-end">4 </td>
                        )}
                        <td className="font-semibold text-end">400 </td>
                        {inputData.planType === "Currency" && (
                          <td className="font-semibold text-end">16000 </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end ga-3">
                  <div className="h-12 rounded-lg w-32 text-white text-end bg-gradient-to-b from-[#004D4D] to-[#0CA65B] p-2 ">
                    <p className="">Top Selling Price</p>
                    <p className="font-semibold">50000</p>
                  </div>
                  <div className="h-12 rounded-lg w-32  text-end  p-2 ">
                    <p className="">Top Service Price</p>
                    <p className="font-semibold">50000</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={closeModal}
            variant="secondary"
            className="text-sm font-semibold"
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddPlans;
