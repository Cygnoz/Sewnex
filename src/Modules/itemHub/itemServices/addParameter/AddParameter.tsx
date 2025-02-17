import { useEffect, useState } from "react";
import ArrowUpRightIcon from "../../../../assets/icons/ArrowUpRighIcon";
import Drawer from "../../../../Components/drawer/Drawer";
import SearchBar from "../../../../Components/SearchBar";
import Button from "../../../../Components/Button";
import CheveronDown from "../../../../assets/icons/CheveronDown";
import EDeleteIcon from "../../../../assets/icons/EDeleteIcon";
import defaultCategoryImage from "../../../../assets/images/defaultCategoryImage.png";
import NewCategoryModal from "./NewCategoryModal";
import NewParameterModal from "./NewParameterModal";
import { endpoints } from "../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import useApi from "../../../../Hooks/useApi";

type Props = {};

function AddParameter({ }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [allParameter, setAllParameter] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allCategory, setAllCategory] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { request: fetchAllParameter } = useApi("get", 5003);
  const { request: deleteParameterRequest } = useApi("delete", 5003);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const getAllParameter = async () => {
    try {
      const url = `${endpoints.GET_ALL_CPS}/parameter`;
      const { response, error } = await fetchAllParameter(url);
      if (!error && response) {
        setAllParameter(response.data.formattedObjects);
      } else {
        console.error("Failed to fetch category data.");
      }
    } catch (error) {
      toast.error("Error in fetching category data.");
      console.error("Error in fetching category data", error);
    }
  };

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

  const filteredParameter = allParameter.filter((parameter: any) =>
    parameter.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || parameter.categoryId === selectedCategory)
  );

  const handleDelete = async (parameter: any) => {
    try {
      const url = `${endpoints.DELETE_CPS}/parameter/${parameter._id}`;
      const { response, error } = await deleteParameterRequest(url);

      if (!error && response) {
        toast.success(response.data.message);
        setAllCategory((prevData: any) => {
          if (!prevData || !Array.isArray(prevData)) return [];
          return prevData.filter((m: any) => m._id !== parameter._id);
        });
        getAllParameter();
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Error occurred while deleting brand.");
    }
  };

  useEffect(() => {
    getAllParameter();
    getAllCategory();
  }, []);

  const HandleOnSave = () => {
    getAllParameter();
  };

  const handleFetchAllCategory = () => {
    getAllCategory();
  };

  const categoryColors = ["#E7FAF1", "#F4F1D5", "#D5EBF4"]; // Define 3 colors

  const getCategoryColor = (categoryId: string) => {
    const hash = categoryId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return categoryColors[hash % categoryColors.length];
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-[30%] cursor-pointer" onClick={toggleDrawer}>
        <div className="bg-white py-4 px-6 rounded-2xl flex justify-between items-center">
          <div className="w-[65%]">
            <p className="text-[#0B1320] font-bold text-base">Add Parameter</p>
            <p className="text-[#495160] text-xs mt-2">
              Add and manage your parameters in this section.
            </p>
          </div>
          <ArrowUpRightIcon height="44" width="44" size="20" bgColor="#2C3E50" />
        </div>
      </div>

      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right" style={{ width: "65%" }}>
        <div className=" flex justify-between items-center">
          <p className="text-[#0B1320] font-bold text-lg">Parameter Master</p>
          <p className="text-3xl cursor-pointer font-light" onClick={() => setDrawerOpen(false)}>
            &times;
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="w-[30%]">
            <SearchBar
              placeholder="Search parameter"
              searchValue={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-3">
              <p className="text-[#495160] font-bold text-sm">Filter by :</p>
              <Button variant="secondary" onClick={toggleDropdown}>
                <p className="text-xs overflow-x-scroll hide-scrollbar w-9 whitespace-nowrap">
                  {selectedCategory ?
                    allCategory.find((cat: any) => cat._id === selectedCategory)?.name : "All"}
                </p>
                <CheveronDown size="16" color="#0B9C56" />
              </Button>

              {isDropdownOpen && (
                <div className="absolute bg-[#F3F3F3] w-[193px] mt-2 rounded-lg shadow-lg z-10 top-32">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-[#E7FAF1] text-xs border-b border-[#D0D5DD] cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsDropdownOpen(false);
                      }}
                    >
                      All Categories
                    </li>
                    {allCategory.map((category: any) => (
                      <li
                        key={category._id}
                        className="px-4 py-2 text-xs overflow-x-scroll hide-scrollbar border-b border-[#D0D5DD] hover:bg-[#E7FAF1] cursor-pointer"
                        onClick={() => {
                          setSelectedCategory(category._id);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <NewCategoryModal fetchAllCategory={handleFetchAllCategory} />
            <NewParameterModal fetchAllParameter={HandleOnSave} allCategory={allCategory} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {filteredParameter.length === 0 ? (
            <div className="flex justify-center items-center p-2 w-full">
              <div className="border border-slate-200 text-textColor rounded-xl w-full h-auto p-3 flex justify-center items-center">
                <div className="text-center">
                  <p className="text-xs text-red-600 text-center">No Parameter Found!</p>
                </div>
              </div>
            </div>
          ) : (
            filteredParameter.map((parameter: any) => {
              const category = allCategory.find((cat: any) => cat._id === parameter.categoryId);
              const categoryColor = category ? getCategoryColor(category._id) : "#E7FAF1"; // Default color

              return (
                <div key={parameter._id} className="flex mt-2">
                  <div className="border w-80 border-[#EAECF0] bg-white text-textColor rounded-lg h-auto py-3 px-4">
                    <div className="flex justify-between">
                      <p
                        className="rounded-[50px] py-1 px-2 text-[#495160] font-semibold text-[11px]"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {category ? category.name : ""}
                      </p>
                      <div className="flex space-x-2">
                        <NewParameterModal
                          fetchAllParameter={HandleOnSave}
                          category={parameter}
                          funtion={"edit"}
                          allCategory={allCategory}
                        />
                        <p className="cursor-pointer" onClick={() => handleDelete(parameter)}>
                          <EDeleteIcon />
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <img
                        src={parameter.uploadImage ? parameter.uploadImage : defaultCategoryImage}
                        className="w-9 rounded-full h-9 object-cover"
                        alt=""
                      />
                      <div className="flex-1 ml-3">
                        <h3 className="text-sm font-bold text-[#0B1320]">{parameter.name}</h3>
                        <p className="text-xs text-[#818894] mt-1">
                          {parameter.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Drawer>
    </>
  );
}

export default AddParameter;
