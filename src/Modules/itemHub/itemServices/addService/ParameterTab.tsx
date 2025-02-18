import toast from "react-hot-toast";
import SearchBar from "../../../../Components/SearchBar";
import { endpoints } from "../../../../Services/apiEdpoints";
import NewParameterModal from "../addParameter/NewParameterModal";
import useApi from "../../../../Hooks/useApi";
import { useEffect, useState } from "react";
import defaultCategoryImage from "../../../../assets/images/defaultCategoryImage.png";
import Checkbox from "../../../../Components/Form/Checkbox";

type Props = {
    state?: any;
    setState?: any
}


function ParameterTab({  setState }: Props) {
    const [allCategory, setAllCategory] = useState<any>([]);
    const [allParameter, setAllParameter] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
    const [selectedParameters] = useState<any[]>([]);

    const { request: fetchAllParameter } = useApi("get", 5003);

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const url = `${endpoints.GET_ALL_CPS}/parameter-category`;
            const { response, error } = await fetchAllParameter(url);
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

    // Fetch all parameters
    const getAllParameter = async () => {
        try {
            const url = `${endpoints.GET_ALL_CPS}/parameter`;
            const { response, error } = await fetchAllParameter(url);
            if (!error && response) {
                setAllParameter(response.data.formattedObjects);
            } else {
                console.error("Failed to fetch parameter data.");
            }
        } catch (error) {
            toast.error("Error in fetching parameter data.");
            console.error("Error in fetching parameter data", error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getAllParameter();
    }, []);

    // Handle checkbox toggle
    const handleParameterToggle = (param: any) => {
        setState((prevState: any) => {
            const isSelected = prevState.parameter.some((p: any) => p.parameterId === param._id);

            const updatedParameters = isSelected
                ? prevState.parameter.filter((p: any) => p.parameterId !== param._id) // Remove if already selected
                : [...prevState.parameter, { parameterId: param._id }]; // Add if not selected

            return { ...prevState, parameter: updatedParameters };
        });
    };

    const [searchQuery, setSearchQuery] = useState<string>("");

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    const filteredParameters =
        selectedCategory === "all"
            ? allParameter.filter((param: any) => param.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : allParameter.filter(
                (param: any) => param.categoryId === selectedCategory && param.name.toLowerCase().includes(searchQuery.toLowerCase())
            );


    return (
        <div>
            <p className="text-[#0B1320] font-bold text-base">Select Parameter</p>
            <p className="text-[#0B1320] text-xs mt-3">Filter by Category:</p>

            {/* Category Tabs */}
            <div className="mt-3 flex gap-2 overflow-x-scroll hide-scrollbar">
                <div
                    className={`cursor-pointer bg-white rounded-lg py-1.5 px-3  flex gap-2 justify-between items-center border
                        ${selectedCategory === "all" ? "border-[#C88000] bg-[#f4e9d9]" : "border-[#EAECF0]"}`}
                    onClick={() => setSelectedCategory("all")}
                >
                    <img src={defaultCategoryImage} className="w-6 h-6 rounded-full object-cover" alt="All" />
                    <p className="text-[#2C3E50] font-medium text-xs w-20 overflow-x-scroll hide-scrollbar">All</p>
                </div>

                {allCategory.map((category: any) => (
                    <div
                        key={category._id}
                        className={`cursor-pointer bg-white rounded-lg py-1.5 px-3  flex gap-2 justify-between items-center border
                            ${selectedCategory === category._id ? "border-[#C88000] bg-[#f4e9d9]" : "border-[#EAECF0]"}`}
                        onClick={() => setSelectedCategory(category._id)}
                    >
                        <img src={category?.uploadImage ? category?.uploadImage : defaultCategoryImage} className="w-6 h-6 rounded-full object-cover" alt={category.name} />
                        <p className="text-[#2C3E50] font-medium text-xs w-20 overflow-x-scroll hide-scrollbar">{category.name}</p>
                    </div>
                ))}
            </div>

            {/* Search & Add Parameter Button */}
            <div className="mt-3 flex justify-between items-center">
                <div className="w-[40%]">
                    <SearchBar searchValue={searchQuery} onSearchChange={handleSearchChange} />
                </div>
                <NewParameterModal allCategory={allCategory} fetchAllParameter={getAllParameter} />
            </div>

            {/* Parameter List */}
            <div className="grid grid-cols-12 gap-6 mt-4">
                <div className="col-span-7">
                    <div className="bg-white p-4 rounded-xl overflow-y-scroll hide-scrollbar max-h-56">
                        <p className="text-[#495160] text-xs font-medium">Choose Parameters</p>
                        <div className="grid grid-cols-12 mt-2 gap-4">
                            {filteredParameters.map((param: any) => (
                                <div className="col-span-6" key={param._id}>
                                    <div
                                        className="bg-white border border-[#EAECF0] py-3 px-4 flex justify-between items-center rounded-lg cursor-pointer"
                                        onClick={() => handleParameterToggle(param)}
                                    >
                                        <img
                                            src={param?.uploadImage ? param?.uploadImage : defaultCategoryImage}
                                            className="w-9 h-9 object-cover rounded-full"
                                            alt={param.name}
                                        />
                                        <p className="text-[#495160] font-semibold text-xs">{param.name}</p>
                                        <Checkbox
                                            id={param._id}
                                            checked={selectedParameters.some((p) => p._id === param._id)}
                                            onChange={() => handleParameterToggle(param)}
                                        />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                {/* Selected Parameters Section */}
                <div className="col-span-5">
                    <div className="bg-white p-4 rounded-[14px] overflow-y-scroll hide-scrollbar max-h-56">
                        <p className="text-[#495160] text-xs font-medium">Selected Parameters</p>
                        {selectedParameters.length > 0 ? (
                            selectedParameters.map((param) => (
                                <div key={param._id} className="mt-2 bg-[#F9F7F5] rounded-lg py-2 px-4 flex justify-between items-center">
                                    <img src={param?.uploadImage ? param?.uploadImage : defaultCategoryImage} className="w-9 h-9 object-cover rounded-full" alt={param.name} />
                                    <p className="text-[#495160] font-semibold text-xs">{param.name}</p>
                                    <p
                                        className="text-3xl font-light text-[#818894] cursor-pointer"
                                        onClick={() => handleParameterToggle(param)}
                                    >
                                        &times;
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-[#818894] mt-2">No parameters selected.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ParameterTab;
