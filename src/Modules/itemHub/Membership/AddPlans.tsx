import { useEffect, useState } from "react";
import Modal from "../../../Components/modal/Modal";
import Button from "../../../Components/Button";
import Input from "../../../Components/Form/Input";
import CirclePlus from "../../../assets/icons/CirclePlus";
import RadioButton from "../../../Components/Form/RadioButton";
import CheveronDown from "../../../assets/icons/CheveronDown";
import Checkbox from "../../../Components/Form/Checkbox";
import SearchBar from "../../../Components/SearchBar";
import { endpoints } from "../../../Services/apiEdpoints";
import useApi from "../../../Hooks/useApi";
import toast from "react-hot-toast";

type Props = { page?: string };

type Service = {
  serviceName: string;
  serviceId: string;
  price: number;
  count: string;
};

interface MembershipPlan {
  planName: string;
  description: string;
  planType: "Currency" | "Percentage";
  discount: number;
  discountAmount: number;
  duration: string;
  services: Service[];
  actualRate: number;
  sellingPrice: number;
}

const initialMembershipPlan: MembershipPlan = {
  planName: "",
  description: "",
  planType: "Currency",
  discount: 0,
  discountAmount: 0,
  duration: "",
  services: [],
  actualRate: 0,
  sellingPrice: 0,
};

function AddPlans({ page }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState<"Currency" | "Percentage">("Currency");
  const [discountApplication, setDiscountApplication] = useState("");
  const [inputData, setInputData] = useState(initialMembershipPlan);
  const [isExpand, setIsExpand] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { request: updatePlan } = useApi("put", 5003);
  const { request: addPlan } = useApi("post", 5003);
  const { request: getAllServices } = useApi("get", 5003);

  const closeModal = () => {
    setModalOpen(false);
    setInputData(initialMembershipPlan);
    setDiscountApplication("");
    setSelectedServices([]);
  };
  const openModal = () => setModalOpen(true);
  const handleExpand = () => setIsExpand((prev) => !prev);

  // Fetch all services
  const fetchData = async () => {
    try {
      const { response, error } = await getAllServices(
        endpoints.GET_ALL_SERVICES
      );
      if (!error && response) setAllServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Helper function to calculate total price
  const calculateTotalPrice = (
    services: any[],
    planType: string,
    discount: number
  ) => {
    let totalPrice = 0;
    let discountPrice = 0;

    if (planType === "Currency") {
      totalPrice = services.reduce(
        (sum, service) =>
          sum + (Number(service.count) * Number(service.price) || 0),
        0
      );
      discountPrice = discount;
    } else if (planType === "Percentage") {
      totalPrice = services.reduce(
        (sum, service) => sum + Number(service.price),
        0
      );
      discountPrice = (totalPrice * discount) / 100;
    }

    return {
      totalPrice: totalPrice.toFixed(2),
      discountPrice: discountPrice.toFixed(2),
      sellingPrice: (totalPrice - discountPrice).toFixed(2),
    };
  };

  // Function to handle input changes
  const handleInputChange = (name: string, value: string | boolean | File) => {
    setInputData((prevData) => ({
      ...prevData,
      [name]: value instanceof File ? URL.createObjectURL(value) : value,
    }));
  };

  // Function to handle service selection
  const handleSelectService = (service: any) => {
    setSelectedServices((prevSelected = []) => {
      const isAlreadySelected = prevSelected.some(
        (s) => s.serviceId === service._id
      );

      const updatedServices = isAlreadySelected
        ? prevSelected.filter((s) => s.serviceId !== service._id)
        : [
            ...prevSelected,
            {
              serviceName: service.serviceName,
              serviceId: service._id,
              price: service.sellingPrice,
              count: inputData.planType === "Currency" ? "1" : "",
            },
          ];

      setInputData((prevData: any) => {
        const { totalPrice, discountPrice, sellingPrice } = calculateTotalPrice(
          updatedServices,
          prevData.planType,
          Number(inputData.discount)
        );

        return {
          ...prevData,
          services: updatedServices,
          actualRate: totalPrice,
          discountAmount: discountPrice,
          sellingPrice,
        };
      });

      return updatedServices;
    });
  };

  // Function to handle count updates
  const handleEditCount = (serviceId: string, newCount: string) => {
    setSelectedServices((prevSelected) => {
      const updatedServices = prevSelected.map((service) =>
        service.serviceId === serviceId
          ? { ...service, count: newCount }
          : service
      );

      setInputData((prevData: any) => {
        const { totalPrice, discountPrice, sellingPrice } = calculateTotalPrice(
          updatedServices,
          prevData.planType,
          Number(inputData.discount)
        );

        return {
          ...prevData,
          services: updatedServices,
          actualRate: totalPrice,
          discountAmount:
            prevData.planType === "Currency" ? discountPrice : "0",
          sellingPrice,
        };
      });

      return updatedServices;
    });
  };

  const handleDiscountApplication = (type: string) => {
    setDiscountApplication(type);
  
    if (type === "all") {
      const updatedServices = allServices.map((service: any) => ({
        serviceName: service.serviceName,
        serviceId: service._id,
        price: service.sellingPrice,
        count: inputData.planType === "Currency" ? "1" : "",
      }));
  
      setSelectedServices(updatedServices);
  
      setInputData((prevData: any) => {
        const { totalPrice, discountPrice, sellingPrice } = calculateTotalPrice(
          updatedServices,
          prevData.planType,
          Number(prevData.discount) // Use prevData to avoid stale state issues
        );
  
        return {
          ...prevData,
          services: updatedServices,
          actualRate: totalPrice,
          discountAmount: discountPrice,
          sellingPrice,
        };
      });
    } else {
      // If "Selected Services" is chosen, clear selectedServices and reset inputData
      setSelectedServices([]);
      setInputData((prevData: any) => ({
        ...prevData,
        services: [],
        actualRate: 0,
        discountAmount: 0,
        sellingPrice: 0, // Reset pricing to avoid leftover values
      }));
    }
  };
  


  const handleSave = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const url =
        page === "edit"
          ? endpoints.EDIT_MEMBERSHIP_PLAN
          : endpoints.ADD_MEMBERSHIP_PLANS;
      const apiCall = page === "edit" ? updatePlan : addPlan;

      const { response, error } = await apiCall(url, inputData);

      if (!error && response) {
        toast.success(response.data.message);
        closeModal();
        setInputData(initialMembershipPlan);
        setDiscountApplication("");
        setSelectedServices([]);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in save operation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(inputData, "inputdata");
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

          <Input
            label="Discount "
            placeholder="Enetr Discount"
            value={inputData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />

          <Input
            label="Duration"
            placeholder="Enter Duration"
            value={inputData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />

{inputData.planType === "Percentage" && (
  <>
    <p className="text-text_primary text-xs font-semibold mt-3">
      Discount is Applicable for
    </p>

    <div className="flex items-start gap-[22px] text-[#495160] mt-2">
      {/* All Services */}
      <label htmlFor="all" className="flex items-center cursor-pointer">
        <RadioButton
          id="all"
          name="discountApplication"
          label=""
          selected={discountApplication}
          onChange={() => handleDiscountApplication("all")}
          className="text-base text-[#495160] font-semibold cursor-pointer"
        />
        <p className="text-xs cursor-pointer ml-2">All Services</p>
      </label>

      {/* Selected Services */}
      <label htmlFor="selected" className="flex items-center cursor-pointer">
        <RadioButton
          id="selected"
          name="discountApplication"
          label=""
          selected={discountApplication}
          onChange={() => handleDiscountApplication("selected")}
          className="text-base text-[#495160] font-semibold cursor-pointer"
        />
        <p className="text-xs cursor-pointer ml-2">Selected Services</p>
      </label>
    </div>
  </>
)}


          <div className="flex my-1">
            <p className="text-text_primary text-xs font-semibold my-3">
              Select Service
            </p>
            <div className="w-[50%] ml-auto">
              <SearchBar
                placeholder="Search Service"
                onSearchChange={setSearch}
                searchValue={search}
                className="h-8 rounded-[36px] bg-[white]"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar">
            {allServices.map((service: any) => (
              <div
                key={service._id}
                className="relative bg-white rounded-lg text-center p-3 w-[150px] mb-3 flex-shrink-0"
              >
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={selectedServices.some(
                      (s) => s.serviceId === service._id
                    )}
                    onChange={() => handleSelectService(service)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-9 h-9 rounded-full"
                  />
                </div>

                <p className="text-center mt-2 text-sm font-semibold text-text_fourthiry">
                  {service.serviceName}
                </p>

                <p className="text-[10px] text-text_tertiary mt-2">Price</p>

                <p className="text-text_fourthiry text-xs mt-0.5 font-semibold">
                  ${service.sellingPrice}
                </p>

                {inputData.planType === "Currency" && (
                  <div className="mt-2">
                    <p className="text-[10px] text-text_secondary mb-1.5">
                      Set Count
                    </p>
                    <input
                      placeholder="Set Count"
                      type="text"
                      value={
                        selectedServices.find(
                          (s) => s.serviceId === service._id
                        )?.count
                      }
                      className="rounded-lg border w-[60%] text-[9px] py-2 px-4 text-center"
                      onChange={(e) =>
                        handleEditCount(service._id, e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {inputData.planType === "Currency" && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input
                disabled
                label="Actual Rate"
                name="actualRate"
                placeholder="Enter Rate"
                value={inputData.actualRate}
                onChange={(e) =>
                  handleInputChange("actualRate", e.target.value)
                }
              />
              <Input
                disabled
                label="Selling Rate"
                name="sellingPrice"
                placeholder="Enter Rate"
                value={inputData.sellingPrice}
                onChange={(e) =>
                  handleInputChange("sellingPrice", e.target.value)
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
                  {inputData.planName}
                </p>
              </div>
              <div className="col-span-2 space-y-2">
                {" "}
                <p> Plan Type</p>
                <p className="font-semibold text-text_fourthiry">
                  {inputData.planType === "Currency" ? "Count" : "Discount"}
                </p>
              </div>
              <div className="col-span-2 space-y-2 ">
                {" "}
                <p>Duration</p>
                <p className="font-semibold text-text_fourthiry">
                  {inputData.duration} Days
                </p>
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
                <p className="font-semibold mt-3 mb-1">Description</p>
                <p>
                 {inputData.description}
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
                      {selectedServices?.map((service) => (
                        <tr>
                          <td className="font-semibold text-end">
                            {service.serviceName}{" "}
                          </td>
                          {inputData.planType === "Currency" && (
                            <td className="font-semibold text-end">
                              {service.count}{" "}
                            </td>
                          )}
                          <td className="font-semibold text-end">
                            {service.price}{" "}
                          </td>
                          {inputData.planType === "Currency" && (
                            <td className="font-semibold text-end">
                              {Number(service.count) * service.price}{" "}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end ga-3">
                  <div className="h-12 rounded-lg w-32 text-white text-end bg-gradient-to-b from-[#004D4D] to-[#0CA65B] p-2 ">
                    <p className="">Top Selling Price</p>
                    <p className="font-semibold">{inputData.sellingPrice}</p>
                  </div>
                  <div className="h-12 rounded-lg w-32  text-end  p-2 ">
                    <p className="">Top Service Price</p>
                    <p className="font-semibold">{inputData.actualRate}</p>
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
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddPlans;
