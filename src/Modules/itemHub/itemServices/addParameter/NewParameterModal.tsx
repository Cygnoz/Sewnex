import { useState } from "react";
import useApi from "../../../../Hooks/useApi";
import { endpoints } from "../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import EPenIcon from "../../../../assets/icons/EPenIcon";
import Button from "../../../../Components/Button";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import Modal from "../../../../Components/modal/Modal";
import Img from "../../../../assets/icons/Img";
import Input from "../../../../Components/Form/Input";
import TextArea from "../../../../Components/Form/TextArea";
import CheveronDown from "../../../../assets/icons/CheveronDown";

type Props = { category?: any; funtion?: string, fetchAllParameter: () => void, allCategory?: any, para?: string };

type parameterData = {
    _id?: string;
    name: string;
    categoryId: string;
    description: string;
    uploadImage?: string;
    price?: string;
};

const initialData: parameterData = {
    _id: "",
    name: "",
    categoryId: "",
    description: "",
    uploadImage: "",
    price: "",
};

function NewParameterModal({ category, funtion, fetchAllParameter, allCategory, para }: Props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputData, setInputdata] = useState<parameterData>(initialData);
    const [isEdit, setIsEdit] = useState<boolean>(false);


    const { request: updateParameterRequest } = useApi("put", 5003);
    const { request: addParameterRequest } = useApi("post", 5003);

    const closeModal = () => {
        setModalOpen(false);
        setInputdata({
            name: "",
            categoryId: "",
            description: "",
            uploadImage: "",
            price: "",
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
        if (category) {
            setIsEdit(true);
            setInputdata({
                _id: category._id || "",
                name: category.name || "",
                categoryId: category.categoryId || "",
                description: category.description || "",
                uploadImage: category.uploadImage || "",
                price: category?.price || ""
            });
        } else {
            setIsEdit(false);
            setInputdata(initialData);
        }
        setModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const categoryType = para === "style" ? "style" : "parameter"
            const url = isEdit
                ? `${endpoints.UPDATE_CPS}/${categoryType}/${inputData._id}`
                : `${endpoints.ADD_CPS}/${categoryType}`;
            const apiCall = isEdit ? updateParameterRequest : addParameterRequest;

            const { response, error } = await apiCall(url, inputData);

            if (!error && response) {
                toast.success(response.data.message);
                fetchAllParameter();
                closeModal();
            } else {
                toast.error(error.response.data.message);
            }
        } catch (error) {
            toast.error("Error in save operation.");
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInputdata((prev) => ({
            ...prev,
            categoryId: e.target.value, // Setting selected category ID
        }));
    };

    return (
        <div>
            {funtion === "edit" ? (
                <p className="cursor-pointer" onClick={openModal}>
                    <EPenIcon />
                </p>
            ) : (
                <Button onClick={openModal}>
                    <CirclePlus />
                    <p className="text-xs"> Add {para == "style" ? "Style" : "Parameter"}</p>
                </Button>
            )}

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                className="w-[70%] text-start px-7 py-6 bg-[#f2f1ed]"
            >
                <div className="flex items-center justify-between py-1 rounded-xl">
                    <p className="font-bold">Add {para == "style" ? "Style" : "Parameter"}</p>
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
                            <div className={`border border-dashed cursor-pointer border-[#B47300] bg-white ${para == "style" ? "h-72" : "h-60"} text-xs flex items-center justify-center rounded-md`}>
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
                                        <p className="text-[#0B0B0B] mt-4 text-xs">
                                            Upload Image{" "}
                                            <span className="text-[#B47300] cursor-pointer">
                                                browse
                                            </span>
                                        </p>
                                        <p className="text-[#6D6D6D] text-[10px] mt-1">
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
                            label={para == "style" ? "Style Name" : "Parameter Name"}
                            placeholder="Enter category Name"
                            value={inputData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                        <div>
                            <label className="text-[#495160] text-xs">Category</label><br />
                            <div className="relative mt-1">
                                <select
                                    className="block appearance-none w-full  bg-white border text-sm h-9 pl-3 pr-10 rounded-full leading-tight focus:outline-none text-black"
                                    value={inputData.categoryId}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" className="text-black option-spacing">Select Category</option>
                                    {allCategory.map((cat: any) => (
                                        <option className="text-black option-spacing" key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <CheveronDown strokeWidth="1.2" color="#495160" />
                                </div>
                            </div>
                        </div>

                        {
                            para == "style" &&
                            <Input
                                label="Price"
                                placeholder="Price"
                                value={inputData.price}
                                onChange={(e) => handleInputChange("price", e.target.value)}
                            />
                        }

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
    )
}

export default NewParameterModal