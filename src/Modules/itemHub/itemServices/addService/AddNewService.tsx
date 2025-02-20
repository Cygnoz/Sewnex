import { useEffect, useState } from "react";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/modal/Modal";
import TickIcon from "../../../../assets/icons/TickIcon";
import InfoTab from "./InfoTab";
import ParameterTab from "./ParameterTab";
import StyleTab from "./StyleTab";
import SummaryTab from "./SummaryTab";
import { endpoints } from "../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import useApi from "../../../../Hooks/useApi";
import EditIcon from "../../../../assets/icons/EditIcon";

type Props = { page?: string; oneServiceData?: string };

const initialServiceData: any = {
  _id: "",

  categoryId: "",
  serviceName: "",
  serviceImage: "",
  unit: "",
  hsnSac: "",

  parameter: [
    {
      parameterId: ""
    }
  ],
  style: [
    {
      styleId: "",
      styleRate: ""
    }
  ],
  taxType: "Inclusive",
  taxRate: "",
  cgst: "",
  sgst: "",
  igst: "",
  styleTotal: "",
  serviceCharge: "",
  sellingPrice: "",
  salesAccountId: "67b57126bf6e5cc904b202bf",
  grandTotal: "",
};


const AddNewService = ({ page, oneServiceData }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [service, setService] = useState<any>(initialServiceData)
  const [selectedParameter, setSelectedParameter] = useState<any[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  console.log(selectedCategory,"selectedCategory");
  

  const { request: addService } = useApi("post", 5003);
  const { request: editService } = useApi("put", 5003);

  console.log(service,"service");
  
  
  useEffect(() => {
    if (page === "Edit" && oneServiceData) {
      setService(oneServiceData);
    }
  }, [page, oneServiceData, isModalOpen]);



  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setActiveTab(0);
    setService(initialServiceData)
  };

  const nextTab = () => setActiveTab((prev) => Math.min(prev + 1, 3));
  const prevTab = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  const tabs = [
    { id: 0, label: "General Info" },
    { id: 1, label: "Parameter" },
    { id: 2, label: "Style" },
    { id: 3, label: "Summary" },
  ];

  const handleSave = async () => {
    try {
      const url =
        page === "Edit"
          ? `${endpoints.EDIT_NEW_ACCOUNT}/${service._id}`
          : endpoints.ADD_SERVICE;
      const API = page === "Edit" ? editService : addService;
      const { response, error } = await API(url, service);
      if (!error && response) {
        toast.success(response.data.message);
        closeModal();
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Error in save operation.");
    }
  };

  return (
    <div>
      {page === "Edit" ? (
        <div onClick={openModal} className="cursor-pointer">
          <EditIcon color={"#C88000"} />
        </div>
      ) : (
        <Button onClick={openModal}>
          <CirclePlus />
          <p> Add service</p>
        </Button>
      )}

      <Modal
        className="w-[80%] px-8 py-6 bg-[#f0eeea] rounded-2xl text-start"
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
                  className={`border-2 flex items-center justify-center text-sm font-semibold rounded-full w-8 h-8 ${activeTab === index
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
                  className={`text-center mt-1 text-sm font-medium ${activeTab >= index
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
                  className={`bg-[#A1AEBE] h-[2px] w-[80px] -mt-6 ${activeTab > index ? "bg-[#B47300]" : "bg-[#A1AEBE]"
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4  rounded-xl">
          {activeTab === 0 && (
            <>
              <InfoTab state={service} setState={setService} setSelectedCategory={setSelectedCategory} />
            </>
          )}
          {activeTab === 1 && (
            <>
              <ParameterTab state={service} setState={setService} setSelectedParameter={setSelectedParameter} />
            </>
          )}
          {activeTab === 2 && (
            <>
              <StyleTab state={service} setState={setService} setSelectedStyle={setSelectedStyle} />
            </>
          )}
          {activeTab === 3 && (
            <>
              <SummaryTab
                state={service}
                setState={setService}
                selectedParameter={selectedParameter}
                selectedStyle={selectedStyle}
                selectedCategory={selectedCategory} />
            </>
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
            <Button onClick={handleSave} className="pl-11 pr-11">
              Done
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
