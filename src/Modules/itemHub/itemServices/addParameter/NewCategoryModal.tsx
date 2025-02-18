import { useState } from "react";
import useApi from "../../../../Hooks/useApi";
import { endpoints } from "../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import EPenIcon from "../../../../assets/icons/EPenIcon";
import Button from "../../../../Components/Button";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import Modal from "../../../../Components/modal/Modal";
import Input from "../../../../Components/Form/Input";
import TextArea from "../../../../Components/Form/TextArea";
import Img from "../../../../assets/icons/Img";

type CategoryData = {
    _id?: string;
    name: string;
    description: string;
    uploadImage?: string;
};

const initialData: CategoryData = {
    name: "",
    description: "",
    uploadImage: "",
};
type Props = { category?: any; funtion?: string, fetchAllCategory: () => void, para?: string };

const NewCategoryModal = ({ category, funtion, fetchAllCategory, para }: Props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputData, setInputdata] = useState<CategoryData>(initialData);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { request: updatecategoryRequest } = useApi("put", 5003);
    const { request: addcategoryRequest } = useApi("post", 5003);

    const closeModal = () => {
        setModalOpen(false);
        setInputdata({
            name: "",
            description: "",
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
                _id: category.id,
                name: category.categoryName,
                description: category.description,
            });
        } else {
            setIsEdit(false);
            setInputdata({
                name: "",
                description: "",
            });
        }
        setModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const categoryType = para === "style" ? "style-category" : "parameter-category"

            const url = isEdit
                ? `${endpoints.UPDATE_CPS}/${categoryType}`
                : `${endpoints.ADD_CPS}/${categoryType}`;
            const apiCall = isEdit ? updatecategoryRequest : addcategoryRequest;

            const { response, error } = await apiCall(url, inputData);

            if (!error && response) {
                toast.success(response.data.message);
                fetchAllCategory()
                closeModal();
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
                <p className="cursor-pointer" onClick={openModal}>
                    <EPenIcon />
                </p>
            ) : (
                <Button variant="secondary" onClick={openModal}>
                    <CirclePlus color="#0B9C56" />
                    <p className="text-xs"> Add Category</p>
                </Button>
            )}

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                className="w-[70%] text-start px-7 py-6 bg-[#f2f1ed]"
            >
                <div className="flex items-center justify-between py-1 rounded-xl">
                    <p className="font-bold">Add category</p>
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
                            label="category Name"
                            placeholder="Enter category Name"
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

export default NewCategoryModal