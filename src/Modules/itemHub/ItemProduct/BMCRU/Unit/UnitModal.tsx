import { useContext, useState } from "react";
import Modal from "../../../../../Components/modal/Modal";
import Button from "../../../../../Components/Button";
import Input from "../../../../../Components/Form/Input";
import CirclePlus from "../../../../../assets/icons/CirclePlus";
import toast from "react-hot-toast";
import {
  UnitResponseContext,
} from "../../../../../Context/ContextShare";
import useApi from "../../../../../Hooks/useApi";
import { endpoints } from "../../../../../Services/apiEdpoints";
import Pen from "../../../../../assets/icons/Pen";

type unitData = {
  _id?: string;
  unitName: string;
  symbol: string;
  quantityCode: string;
  precision: string;
};

const initialData: unitData = {
  unitName: "",
  symbol: "",
  quantityCode: "",
  precision: "",
};
type Props = { unit?: any; funtion?: string };

const UnitModal = ({ unit, funtion }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputData, setInputdata] = useState<unitData>(initialData);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { setUnitResponse } = useContext(UnitResponseContext)!;

  const { request: updateunitRequest } = useApi("put", 5003);
  const { request: addunitRequest } = useApi("post", 5003);

  const closeModal = () => {
    setModalOpen(false);
    setInputdata({
      unitName: "",
      symbol: "",
      quantityCode: "",
      precision: "",
    });
  };

  const handleInputChange = (name: string, value: string | boolean | File) => {
    setInputdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => {
    if (unit) {
      setIsEdit(true);
      setInputdata({
        _id: unit.id,
        unitName: unit.unitName,
        symbol: unit.symbol,
        quantityCode: unit.quantityCode,
        precision: unit.precision,
      });
    } else {
      setIsEdit(false);
      setInputdata({
        unitName: "",
        symbol: "",
        quantityCode: "",
        precision: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const url = isEdit
        ? `${endpoints.UPDATE_UNIT}/${unit._id}`
        : `${endpoints.ADD_UNIT}`;
      const apiCall = isEdit ? updateunitRequest : addunitRequest;

      const { response, error } = await apiCall(url, inputData);

      if (!error && response) {
        toast.success(`unit ${isEdit ? "updated" : "added"} successfully!`);
        closeModal();
        setUnitResponse((prevData: any) => ({
          ...prevData,
          data: response.data,
        }));
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in save operation.");
    }
  };
  return (
    <div>
     {funtion === "edit" ? (
  <button
    onClick={(e) => {
      e.preventDefault();
      openModal();
    }}
    className="mt-1"
  >
    <Pen size={18} color={"#818894"} />
  </button>
) : funtion === "product" ? (
  <button
    className="text-[#c78000] flex items-center justify-start p-2 text-xs gap-2"
    onClick={(e) => {
      e.preventDefault();
      openModal();
    }}
  >
    <CirclePlus color="#c78000" />
    <p>Add Unit</p>
  </button>
) : (
  <Button onClick={openModal}>
    <CirclePlus />
    Create unit
  </Button>
)}


      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="w-[40%] text-start px-7 py-6 bg-[#f2f1ed]"
      >
        <div className="flex items-center justify-between py-1 rounded-xl">
          <p className="font-bold">Create Unit</p>
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
          <div className=" space-y-2">
            <Input
              label=" Name"
              placeholder="Enter Unit Name"
              value={inputData.unitName}
              onChange={(e) => handleInputChange("unitName", e.target.value)}
            />
            <Input
              label="Symbol"
              placeholder=" symbol "
              value={inputData.symbol}
              onChange={(e) => handleInputChange("symbol", e.target.value)}
            />
            <Input
              label="Quantity"
              placeholder="Enter Quantity"
              value={inputData.quantityCode}
              onChange={(e) =>
                handleInputChange("quantityCode", e.target.value)
              }
            />
            <Input
              label="Unit Precision"
              placeholder="Enter Precision"
              value={inputData.precision}
              onChange={(e) => handleInputChange("precision", e.target.value)}
            />
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
};

export default UnitModal;
