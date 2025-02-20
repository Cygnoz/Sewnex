import { useEffect, useState } from "react";
import Input from "../../../../Components/Form/Input"
import Select from "../../../../Components/Form/Select"
import Modal from "../../../../Components/modal/Modal";
import EditIcon from "../../../../assets/icons/EditIcon";
import defaultCategoryImage from "../../../../assets/images/defaultCategoryImage.png";
import Button from "../../../../Components/Button";
import { endpoints } from "../../../../Services/apiEdpoints";
import useApi from "../../../../Hooks/useApi";
import toast from "react-hot-toast";

type Props = {
  state?: any;
  setState?: any;
  selectedParameter?: any;
  selectedStyle?: any;
  selectedCategory?: string
}

function SummaryTab({ state, selectedParameter, selectedCategory, selectedStyle, setState }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedStyle, setEditedStyle] = useState<{ styleId: string; styleRate: string } | null>(null);
  const [taxData, setTaxData] = useState<any>([]);
  // const [isInclusive, setIsInclusive] = useState(true);

  const { request: getUnit } = useApi("get", 5003);

  const openModal = (styleId: string, currentRate: string) => {
    setEditedStyle({ styleId, styleRate: currentRate });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditedStyle(null);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedStyle) {
      setEditedStyle({ ...editedStyle, styleRate: e.target.value });
    }
  };

  const getAllTax = async () => {
    try {
      const url = `${endpoints.GET_ALL_ITEMS_Dropdown}`;
      const { response, error } = await getUnit(url);
      if (!error && response) {
        setTaxData(response.data);
      } else {
        console.error("Failed to fetch category data.");
      }
    } catch (error) {
      toast.error("Error in fetching category data.");
      console.error("Error in fetching category data", error);
    }
  };

  useEffect(() => {
    getAllTax();
  }, []);

  // const handleCheckboxChange = (type: string) => {
  //   setIsInclusive(type === "Inclusive");

  //   if (type === "Exclusive") {
  //     setState((prevState: any) => ({
  //       ...prevState,
  //       taxRate: "",
  //     }));
  //   }
  // };


  const handleInputChange = (field: string, value: any) => {
    if (field === "taxRate") {
      const selectedTax = taxData?.taxRate?.find((rate: any) => rate.taxName === value);

      setState((prevState: any) => ({
        ...prevState,
        taxRate: value,
        cgst: selectedTax?.cgst || "",
        sgst: selectedTax?.sgst || "",
        igst: selectedTax?.igst || "",
      }));
    } else {
      setState((prevState: any) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };



  const saveUpdatedRate = () => {
    if (editedStyle && setState) {
      setState((prevState: any) => ({
        ...prevState,
        style: prevState.style.map((s: any) =>
          s.styleId === editedStyle.styleId ? { ...s, styleRate: editedStyle.styleRate } : s
        ),
      }));
      closeModal();
    }
  };

  const totalStyleAmount = state?.style?.reduce((total: number, s: any) => total + parseFloat(s.styleRate || "0"), 0) || 0;
  const sellingPrice = totalStyleAmount + (parseFloat(state?.serviceCharge || "0"));
  const igstPercentage = parseFloat(state?.igst || "0");
  const taxAmount = (igstPercentage / 100) * sellingPrice;
  const total = sellingPrice + taxAmount;


  useEffect(() => {
    setState((prevState: any) => ({
      ...prevState,
      styleTotal: totalStyleAmount,
      sellingPrice: sellingPrice,
      grandTotal: total,
    }));
  }, [state.style, state.serviceCharge, state.taxRate]);

  return (
    <div className="max-h-[55vh] overflow-y-scroll hide-scrollbar">
      <p className="text-[#0B1320] font-bold text-base">Service Summary</p>
      <div className="mt-4 bg-white py-5 px-6 rounded-2xl">
        <div className="bg-[#F8F8F8] rounded-lg py-[14px] px-4 flex gap-10">
          <p className="text-[#495160] font-medium text-[11px]">Category
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">{selectedCategory}</p>
          </p>
          <p className="text-[#495160] font-medium text-[11px]">Service Name
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">{state?.serviceName}</p>
          </p>
          <p className="text-[#495160] font-medium text-[11px]">Unit
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">{state?.unit}</p>
          </p>
          <p className="text-[#495160] font-medium text-[11px]">HSN/SAC Code
            <p className="mt-1.5 text-[#0B1320] text-sm font-semibold">{state?.hsnSac}</p>
          </p>
        </div>
        <p className="text-[#0B1320] font-bold text-sm mt-2">Parameter</p>

        <div className="mt-2 flex justify-start items-center gap-4">
          {selectedParameter?.map((para: any, index: number) => (
            <div key={index} className="bg-[#F8F8F8] py-2 px-4 rounded-lg flex justify-between items-center gap-4  w-36">
              <img src={para.uploadImage ? para.uploadImage : defaultCategoryImage} className="w-6 h-6 object-cover rounded-full" alt="" />
              <p className="text-[#495160] font-semibold text-xs">{para.name}</p>
            </div>
          ))}
        </div>
        <p className="text-[#0B1320] font-bold text-sm mt-2">Style</p>

        <div className="mt-2 flex items-center justify-start gap-4">
          {selectedStyle?.map((style: any, index: number) => {
            const matchedStyle = state?.style?.find((s: any) => s.styleId === style._id);
            const styleRate = matchedStyle ? matchedStyle.styleRate : "0.00";
            return (
              <div key={index} className="bg-[#F8F8F8] rounded-lg py-[10px] px-[14px] flex justify-between items-center gap-12">
                <div className="flex gap-4 items-center">
                  <img
                    src={style.uploadImage ? style.uploadImage : defaultCategoryImage}
                    className="w-6 h-6 rounded-full object-cover"
                    alt=""
                  />
                  <p className="text-[#0B1320] text-xs font-bold">{style.name}</p>
                </div>
                <p className="text-[#0B1320] text-xs font-bold">₹{styleRate}</p>
                <div className="cursor-pointer" onClick={() => openModal(style._id, styleRate)}>
                  <EditIcon color="#495160" />
                </div>
              </div>
            );
          })}

          <Modal open={isModalOpen} onClose={closeModal} className="p-6 bg-white rounded-2xl w-[27%]">
            <div className="flex items-center justify-between py-1 rounded-xl">
              <p className="font-bold">Edit item</p>
              <button onClick={closeModal} className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1">
                &times;
              </button>
            </div>
            {editedStyle && (
              <>
                <div className="mt-4 flex justify-between">
                  <img src={defaultCategoryImage} className="w-8 h-8 object-cover rounded-full" alt="" />
                  <div>
                    <p className="text-[#495160] text-xs">Style</p>
                    <p className="text-[#0B1320] font-semibold text-sm">
                      {selectedStyle.find((s: any) => s._id === editedStyle.styleId)?.name}
                    </p>
                  </div>
                  <p className="text-[#495160] text-sm font-semibold">₹{editedStyle.styleRate}</p>
                </div>
                <div className="mt-4">
                  <Input label="Rate" placeholder="0.00" value={editedStyle.styleRate} onChange={handleRateChange} />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button onClick={closeModal} variant="secondary" className="text-sm font-semibold">
                    Cancel
                  </Button>
                  <Button onClick={saveUpdatedRate}>Save</Button>
                </div>
              </>
            )}
          </Modal>
        </div>


        <div className="flex justify-end">
          <p className="text-[#495160] font-bold text-sm">
            Style Total: <span className="text-[#0B1320] ms-5 font-bold text-base">₹{totalStyleAmount.toFixed(2)}</span>
          </p>
        </div>
        {/*         
        <div className="flex mt-4 gap-6">
          <div className="flex items-center gap-1 text-textColor">
            <Checkbox
              id="checkboxInclusive"
              name="Inclusive"
              className="w-5 h-5 mx-1 my-1 mt-1.5"
              checked={isInclusive}
              onChange={() => handleCheckboxChange("Inclusive")}
            />
            <label
              htmlFor="checkboxInclusive"
              className="text-[#495160] text-sm font-semibold cursor-pointer"
            >
              Inclusive
            </label>
          </div>
          <div className="flex items-center gap-1 text-textColor">
            <Checkbox
              id="checkboxExclusive"
              name="Exclusive"
              className="w-5 h-5 mx-1 my-1 mt-1.5"
              checked={!isInclusive}
              onChange={() => handleCheckboxChange("Exclusive")}
            />
            <label
              htmlFor="checkboxExclusive"
              className="text-[#495160] text-sm font-semibold cursor-pointer"
            >
              Exclusive
            </label>
          </div>
        </div> */}

        {/* TaxRate and Service Input Section */}
        <div className="mt-3 flex justify-between gap-4">
          <div className="w-[50%]">
            <Select
              required
              options={taxData?.taxRate?.map((rate: any) => ({
                label: rate.taxName,
                value: rate.taxName,
              }))}
              label="Tax Rate"
              placeholder="Select Tax Rate"
              value={state.taxRate}
              onChange={(value) => handleInputChange("taxRate", value)}
            />
          </div>

          <div className="w-[50%]">
            <Input
              placeholder="Enter"
              label="Service Charge"
              value={state.serviceCharge || ""}
              onChange={(e) => handleInputChange("serviceCharge", e.target.value)}
            />
          </div>
        </div>



        <div className="mt-3 flex justify-end">
          <div>
            <p className="text-[#495160] font-bold text-sm">
              Style Amount:
              <span className="text-[#0B1320] ms-5 font-bold text-base">₹{totalStyleAmount.toFixed(2)}</span>
            </p>
            <p className="text-[#495160] font-bold text-sm">
              Service Amount:
              <span className="text-[#0B1320] ms-5 font-bold text-base">₹{state.serviceCharge ? state.serviceCharge : "0.00"}</span>
            </p>
            <p className="text-[#495160] font-bold text-sm">
              Tax Amount:
              <span className="text-[#0B1320] ms-5 font-bold text-base">{state.igst ? state.igst : "0"}%</span>
            </p>
            <p className="text-[#495160] font-bold text-sm">
              Total:
              <span className="text-[#0B1320] ms-5 font-bold text-base">₹{total.toFixed(2)}</span>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SummaryTab