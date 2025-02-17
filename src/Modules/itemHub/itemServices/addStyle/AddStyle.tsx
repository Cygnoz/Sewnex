import { useState, useEffect } from "react";
import ArrowUpRightIcon from "../../../../assets/icons/ArrowUpRighIcon";
import bgImage from "../../../../assets/images/rb_2148833203 1.png";
import useApi from "../../../../Hooks/useApi";
import { endpoints } from "../../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import Drawer from "../../../../Components/drawer/Drawer";
import SearchBar from "../../../../Components/SearchBar";
import Button from "../../../../Components/Button";
import CheveronDown from "../../../../assets/icons/CheveronDown";
import NewCategoryModal from "../addParameter/NewCategoryModal";
import EDeleteIcon from "../../../../assets/icons/EDeleteIcon";
import defaultCategoryImage from "../../../../assets/images/defaultCategoryImage.png";
import NewParameterModal from "../addParameter/NewParameterModal";

type Props = {};

function AddStyle({ }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [allStyle, setAllStyle] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allCategory, setAllCategory] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // For selected category
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For controlling dropdown visibility

  const { request: fetchAllStyle } = useApi("get", 5003);
  const { request: deleteStyleRequest } = useApi("delete", 5003);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const getAllStyle = async () => {
    try {
      const url = `${endpoints.GET_ALL_CPS}/style`;
      const { response, error } = await fetchAllStyle(url);
      if (!error && response) {
        setAllStyle(response.data.formattedObjects);
      } else {
        console.error("Failed to fetch style data.");
      }
    } catch (error) {
      toast.error("Error in fetching style data.");
      console.error("Error in fetching style data", error);
    }
  };

  const getAllCategory = async () => {
    try {
      const url = `${endpoints.GET_ALL_CPS}/style-category`;
      const { response, error } = await fetchAllStyle(url);
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

  const filteredStyle = allStyle.filter((style: any) =>
    style.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || style.categoryId === selectedCategory)
  );

  const handleDelete = async (style: any) => {
    try {
      const url = `${endpoints.DELETE_CPS}/style/${style._id}`;
      const { response, error } = await deleteStyleRequest(url);

      if (!error && response) {
        toast.success(response.data.message);
        setAllStyle((prevData: any) => prevData.filter((s: any) => s._id !== style._id));
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Error occurred while deleting style.");
    }
  };

  useEffect(() => {
    getAllStyle();
    getAllCategory();
  }, []);

  const HandleOnSave = () => {
    getAllStyle();
  };

  const handleFetchAllCategory = () => {
    getAllCategory();
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const categoryColors = ["#E7FAF1", "#F4F1D5", "#D5EBF4"];

  const getCategoryColor = (categoryId: string) => {
    const hash = categoryId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return categoryColors[hash % categoryColors.length];
  };

  return (
    <>
      <div className="w-[40%]" onClick={toggleDrawer}>
        <div className="bg-gradient-to-b from-[#F7ECD9] to-[#B5F0D3] relative py-4 px-6 rounded-2xl flex justify-between items-center">
          <div className="w-[50%]">
            <p className="text-[#0B1320] font-bold text-base">Add Style</p>
            <p className="text-[#495160] text-xs mt-2">
              Add, manage, and personalize your styles in this section.
            </p>
          </div>
          <img src={bgImage} className="w-32 top-2 absolute right-16 object-contain" alt="" />
          <div>
            <ArrowUpRightIcon height="44" width="44" size="20" bgColor="#2C3E50" />
          </div>
        </div>
      </div>

      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right" style={{ width: "65%" }}>
        <div className="flex justify-between items-center">
          <p className="text-[#0B1320] font-bold text-lg">Style Master</p>
          <p className="text-3xl cursor-pointer font-light" onClick={() => setDrawerOpen(false)}>
            &times;
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="w-[40%]">
            <SearchBar placeholder="Search style" searchValue={searchTerm} onSearchChange={handleSearchChange} />
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
            <NewCategoryModal para="style" fetchAllCategory={handleFetchAllCategory} />
            <NewParameterModal fetchAllParameter={HandleOnSave} allCategory={allCategory} para="style" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {filteredStyle.length === 0 ? (
            <div className="flex justify-center items-center p-2 w-full">
              <div className="border border-slate-200 text-textColor rounded-xl w-full h-auto p-3 flex justify-center items-center">
                <div className="text-center">
                  <p className="text-xs text-red-600 text-center">No Styles Found!</p>
                </div>
              </div>
            </div>
          ) : (
            filteredStyle.map((style: any) => {
              const category = allCategory.find((cat: any) => cat._id === style.categoryId);
              const categoryColor = category ? getCategoryColor(category._id) : "#E7FAF1"; // Default color

              return (
                <div key={style._id} className="flex mt-2">
                  <div className="border w-80 border-[#EAECF0] bg-white text-textColor rounded-lg h-auto py-3 px-4">
                    <div className="flex justify-between">
                      <p
                        className="rounded-[50px] py-1 px-2 text-[#495160] font-semibold text-[11px]"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {category ? category.name : ""}
                      </p>
                      <div className="flex space-x-2">
                        <p className="cursor-pointer" onClick={() => handleDelete(style)}>
                          <EDeleteIcon />
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <img
                        src={style.uploadImage ? style.uploadImage : defaultCategoryImage}
                        className="w-9 rounded-full h-9 object-cover"
                        alt=""
                      />
                      <div className="flex-1 ml-3">
                        <h3 className="text-sm font-bold text-[#0B1320]">{style.name}</h3>
                        <p className="text-xs text-[#818894] mt-1">{style.description}</p>
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

export default AddStyle;
