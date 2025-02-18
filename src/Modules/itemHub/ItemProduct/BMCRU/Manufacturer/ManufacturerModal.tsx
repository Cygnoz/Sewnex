import  { useContext, useState } from 'react'
import Modal from '../../../../../Components/modal/Modal';
import Button from '../../../../../Components/Button';
import TextArea from '../../../../../Components/Form/TextArea';
import Input from '../../../../../Components/Form/Input';
import CirclePlus from '../../../../../assets/icons/CirclePlus';
import toast from 'react-hot-toast';
import { BmcrReponseContext } from '../../../../../Context/ContextShare';
import useApi from '../../../../../Hooks/useApi';
import { endpoints } from '../../../../../Services/apiEdpoints';
import Img from '../../../../../assets/icons/Img';
import Pen from '../../../../../assets/icons/Pen';

type manufacturerData = {
    _id?: string;
    name: string;
    description: string;
    uploadImage?: string;
    type: "manufacturer";
  };
  
  const initialData: manufacturerData = {
    name: "",
    description: "",
    type: "manufacturer",
    uploadImage: "",
  };
  type Props = { manufacturer?: any; funtion?: string };

const ManufacturerModal = ({manufacturer,funtion}: Props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputData, setInputdata] = useState<manufacturerData>(initialData);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { setBmcrResponse } = useContext(BmcrReponseContext)!;
  
    const { request: updatemanufacturerRequest } = useApi("put", 5003);
    const { request: addmanufacturerRequest } = useApi("post", 5003);
  
    const closeModal = () => {
      setModalOpen(false);
      setInputdata({
        name: "",
        description: "",
        type: "manufacturer",
      });
    };
  
    const handleInputChange = (name: string, value: string | boolean | File) => {
      if (name === "uploadImage" && value instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(value);
  
        reader.onload = () => {
          setInputdata((prevData) => ({
            ...prevData,
            [name]: reader.result as string,
          }));
        };
  
        reader.onerror = (error) => {
          console.error("Error converting file to Base64:", error);
        };
      } else {
        setInputdata((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
    const openModal = () => {
      if (manufacturer) {
        setIsEdit(true);
        setInputdata({
          _id: manufacturer.id,
          name: manufacturer.manufacturerName,
          description: manufacturer.description,
          type: manufacturer.type || "manufacturer",
        });
      } else {
        setIsEdit(false);
        setInputdata({
          name: "",
          description: "",
          type: "manufacturer",
        });
      }
      setModalOpen(true);
    };
  
    const handleSave = async () => {
      try {
        const url = isEdit ? `${endpoints.UPDATE_BRMC}` : `${endpoints.ADD_BRMC}`;
        const apiCall = isEdit ? updatemanufacturerRequest : addmanufacturerRequest;
  
        const { response, error } = await apiCall(url, inputData);
  
        if (!error && response) {
          toast.success(`manufacturer ${isEdit ? "updated" : "added"} successfully!`);
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
        {funtion === "edit" ? (
          <button onClick={openModal} className="mt-1">
            {" "}
            <Pen size={18} color={"#818894"} />
          </button>
        ) :funtion === "product" ? (
          <button
            className="text-[#c78000] flex items-center justify-start p-2 text-xs gap-2"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            <CirclePlus color="#c78000" />
            <p>Add Manufacturer</p>
          </button>
        ) : (
          <Button onClick={openModal}>
            <CirclePlus />
            Add Manufacturer
          </Button>
        )}
  
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          className="w-[600px] text-start px-7 py-6 bg-[#f2f1ed]"
        >
          <div className="flex items-center justify-between py-1 rounded-xl">
            <p className="font-bold">Add manufacturer</p>
            <div className="flex gap-2 items-center">
              <button
                onClick={closeModal}
                className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-1">
            <div className="col-span-3">
              <label htmlFor="fileInput">
                <div className="border border-dashed cursor-pointer border-[#B47300] bg-white h-40 text-xs flex items-center justify-center rounded-md">
                  {inputData.uploadImage ? (
                    <img
                      src={inputData.uploadImage}
                      alt="Uploaded"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Img />
                      </div>
                      <p className="text-[#0B0B0B]">
                        Upload Image{" "}
                        <span className="text-[#B47300] cursor-pointer">
                          browse
                        </span>
                      </p>
                      <p className="text-[#6D6D6D] text-[11px]">
                        Support JPG, PNG
                      </p>
                    </div>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="fileInput"
                hidden
                accept=".jpg, .png"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleInputChange("uploadImage", e.target.files[0])
                }
              />
            </div>
            <div className="col-span-9 space-y-2">
              <Input
                label="Manufacturer Name"
                placeholder="Enter Manufacturer Name"
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
  

export default ManufacturerModal