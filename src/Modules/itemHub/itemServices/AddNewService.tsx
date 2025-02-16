import { useState } from "react";
import CirclePlus from "../../../assets/icons/CirclePlus";
import Button from "../../../Components/Button";
import Modal from "../../../Components/modal/Modal";
import TickIcon from "../../../assets/icons/TickIcon";

type Props = {};

const AddNewService = ({}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setActiveTab(0);
  };

  const nextTab = () => setActiveTab((prev) => Math.min(prev + 1, 3));
  const prevTab = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  const tabs = [
    { id: 0, label: "General Info" },
    { id: 1, label: "Parameter" },
    { id: 2, label: "Style" },
    { id: 3, label: "Summary" },
  ];

  return (
    <div>
      <Button onClick={openModal}>
        <CirclePlus />
        <p> Add service</p>
      </Button>

      <Modal
        className="w-[77%] p-8 bg-[#F9F7F5] rounded-2xl"
        open={isModalOpen}
        onClose={closeModal}
      >
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 flex justify-between items-center">
          <p className="text-[#0B1320] font-bold text-lg">Add service</p>
          <p
            className="text-3xl cursor-pointer font-light"
            onClick={closeModal}
          >
            &times;
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex justify-center items-center">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              {/* Tab Circle */}
              <div className="flex flex-col items-center w-24">
                <p
                  className={`border-2 flex items-center justify-center text-sm font-semibold rounded-full w-8 h-8 ${
                    activeTab === index
                      ? "border-[#B47300] bg-white text-[#C88000]"
                      : activeTab > index
                      ? "border-[#B47300] bg-[#C88000] text-white"
                      : "border-[#A1AEBE] bg-white text-[#242E39]"
                  }`}
                >
                  {activeTab > index ? <TickIcon /> : `0${index + 1}`}
                </p>

                {/* Tab Label */}
                <p
                  className={`text-center mt-1 text-sm font-medium ${
                    activeTab >= index
                      ? "text-[#B47300] font-bold"
                      : "text-[#465668]"
                  }`}
                >
                  {tab.label}
                </p>
              </div>

              {/* Line between tabs (except last one) */}
              {index < tabs.length - 1 && (
                <div
                  className={`bg-[#A1AEBE] h-[2px] w-[80px] -mt-6 ${
                    activeTab > index ? "bg-[#B47300]" : "bg-[#A1AEBE]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 p-6 bg-white rounded-xl">
          {activeTab === 0 && (
            <div>
              <p className="text-lg font-semibold mb-2">General Information</p>
              <input
                type="text"
                placeholder="Enter service name"
                className="border p-2 rounded w-full"
              />
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <p className="text-lg font-semibold mb-2">Choose Parameters</p>
              <input
                type="text"
                placeholder="Enter parameter"
                className="border p-2 rounded w-full"
              />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <p className="text-lg font-semibold mb-2">Style Selection</p>
              <input
                type="text"
                placeholder="Select style"
                className="border p-2 rounded w-full"
              />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <p className="text-lg font-semibold mb-2">Summary</p>
              <textarea
                placeholder="Enter summary"
                className="border p-2 rounded w-full h-20"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          {activeTab === 0 ? (
            <Button
              onClick={closeModal}
              variant="secondary"
              className="pl-10 pr-10"
            >
              Cancel
            </Button>
          ) : (
            <Button
              onClick={prevTab}
              variant="secondary"
              className="pl-10 pr-10"
            >
              Back
            </Button>
          )}
          {activeTab === 3 ? (
            <Button onClick={closeModal} className="pl-11 pr-11">
              Finish
            </Button>
          ) : (
            <Button onClick={nextTab} className="pl-11 pr-11">
              Next
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddNewService;
