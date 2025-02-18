import { useContext, useState } from "react";
import Button from "../../../../../Components/Button";
import Modal from "../../../../../Components/modal/Modal";
import Input from "../../../../../Components/Form/Input";
import TextArea from "../../../../../Components/Form/TextArea";
import useApi from "../../../../../Hooks/useApi";
import { endpoints } from "../../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import CirclePlus from "../../../../../assets/icons/CirclePlus";
import Pen from "../../../../../assets/icons/Pen";
import { BmcrReponseContext } from "../../../../../Context/ContextShare";

type Props = { page?: string; rack?: any };

type RackData = {
  _id?: string;
  name: string;
  description: string;
  type: "rack";
};

const initialData: RackData = {
  name: "",
  description: "",
  type: "rack",
};

const RackModal = ({ page, rack }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputData, setInputdata] = useState<RackData>(initialData);
  const { setBmcrResponse } = useContext(BmcrReponseContext)!;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { request: updaterackRequest } = useApi("put", 5003);
  const { request: addrackRequest } = useApi("post", 5003);

  const closeModal = () => {
    setModalOpen(false);
    setInputdata({
      name: "",
      description: "",
      type: "rack",
    });
  };

  const handleInputChange = (name: string, value: string | boolean | File) => {
    setInputdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const openModal = () => {
    if (rack) {
      setIsEdit(true);
      setInputdata({
        _id: rack.id,
        name: rack.rackName,
        description: rack.description,
        type: rack.type || "rack",
      });
    } else {
      setIsEdit(false);
      setInputdata({
        name: "",
        description: "",
        type: "rack",
      });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const url = isEdit ? `${endpoints.UPDATE_BRMC}` : `${endpoints.ADD_BRMC}`;
      const apiCall = isEdit ? updaterackRequest : addrackRequest;

      const { response, error } = await apiCall(url, inputData);

      if (!error && response) {
        toast.success(`rack ${isEdit ? "updated" : "added"} successfully!`);
        closeModal();
        setBmcrResponse((prevData: any) => ({
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
      {page === "edit" ? (
        <button onClick={openModal} className="mt-1">
          {" "}
          <Pen size={18} color={"#818894"} />
        </button>
      ) : (
        <Button onClick={openModal}>
          <CirclePlus />
          Add rack
        </Button>
      )}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="w-[45%] text-start px-7 py-6 bg-[#f2f1ed]"
      >
        <div className="flex items-center justify-between py-1 rounded-xl">
          <p className="font-bold">Add rack</p>
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
          <Input
            label="
            
            Rack Name"
            placeholder="Enter Rack Name"
            value={inputData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextArea
            label="Description"
            placeholder="Note"
            value={inputData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
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

export default RackModal;
