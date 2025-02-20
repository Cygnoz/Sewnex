import { useContext, useEffect, useState } from "react";
import Img from "../../../../assets/icons/Img"
import { endpoints } from "../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import useApi from "../../../../Hooks/useApi";
import Select from "../../../../Components/Form/Select";
import Input from "../../../../Components/Form/Input";
import UnitModal from "../../ItemProduct/BMCRU/Unit/UnitModal";
import { UnitResponseContext } from "../../../../Context/ContextShare";

type Props = {
    state?: any;
    setState?: any;
    setSelectedCategory: (categoryName: string) => void;
}


function InfoTab({ state, setState, setSelectedCategory }: Props) {
    const [allCategory, setAllCategory] = useState<any>([]);
    const [unitData, setUnitData] = useState<any>([]);
    const { unitResponse } = useContext(UnitResponseContext)!;


    const { request: fetchAllCategory } = useApi("get", 5003);

    const getAllCategory = async () => {
        try {
            const url = `${endpoints.GET_ALL_CPS}/category`;
            const { response, error } = await fetchAllCategory(url);
            if (!error && response) {
                setAllCategory(response.data.formattedObjects);
            } else {
                console.error("Failed to fetch category data.");
            }
        } catch (error) {
            toast.error("Error in fetching category data.");
            console.error("Error in fetching category data", error);
        }
    };
    const getAllUnit = async () => {
        try {
            const url = `${endpoints.GET_ALL_UNIT}`;
            const { response, error } = await fetchAllCategory(url);
            if (!error && response) {
                setUnitData(response.data);
            } else {
                console.error("Failed to fetch category data.");
            }
        } catch (error) {
            toast.error("Error in fetching category data.");
            console.error("Error in fetching category data", error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getAllUnit();
    }, [unitResponse]);

    const handleInputChange = (name: string, value: string | boolean | File) => {
        if (name === "categoryId") {
            const selectedCategory = allCategory.find((category: any) => category._id === value);
            setSelectedCategory(selectedCategory ? selectedCategory.name : "");
        }

        if (name === "serviceImage" && value instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(value);

            reader.onload = () => {
                setState((prevData: any) => ({
                    ...prevData,
                    [name]: reader.result as string,
                }));
            };

            reader.onerror = (error) => {
                console.error("Error converting file to Base64:", error);
            };
        } else {
            setState((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    return (
        <div>
            <p className="text-[#0B1320] font-bold text-base">General info</p>
            <div className="mt-4 grid grid-cols-12">
                <div className="col-span-3">
                    <label htmlFor="fileInput">
                        <div className="border border-dashed cursor-pointer border-[#B47300] bg-white h-40 w-[70%] text-xs flex items-center justify-center rounded-md">
                            {state.serviceImage ? (
                                <img
                                    src={state.serviceImage}
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
                            handleInputChange("serviceImage", e.target.files[0])
                        }
                    />
                </div>
                <div className="col-span-9 -ms-5">
                    <div className="flex justify-between items-center gap-4">
                        <div className="w-[50%]">
                            <Select
                                placeholder="Select category"
                                onChange={(value: string) => handleInputChange("categoryId", value)}
                                value={state.categoryId}
                                label="Category"
                                options={
                                    allCategory?.map((category: any) => ({
                                        value: category._id,
                                        label: category.name,
                                    })) || []
                                }
                            />
                        </div>
                        <div className="w-[50%]">
                            <Input
                                placeholder="Enter Service"
                                label="Service Name"
                                value={state.serviceName}
                                onChange={(e) => handleInputChange("serviceName", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center gap-4">
                        <div className="w-[50%]">
                            <Select
                                options={unitData.map((unit: any) => ({
                                    label: unit.unitName,
                                    value: unit.unitName,
                                }))}
                                label="Unit "
                                placeholder="Select Unit"
                                value={state.unit}
                                onChange={(value) => handleInputChange("unit", value)}
                                addNew={<UnitModal funtion={"product"} />}
                            />
                        </div>
                        <div className="w-[50%]">
                            <Input
                                placeholder="Enter"
                                label="HSN/SAC Code"
                                value={state.hsnSac}
                                onChange={(e) => handleInputChange("hsnSac", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoTab;
