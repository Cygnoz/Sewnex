import { useContext, useEffect, useState } from "react";
import { BmcrReponseContext } from "../../../../../Context/ContextShare";
import useApi from "../../../../../Hooks/useApi";
import toast from "react-hot-toast";
import { endpoints } from "../../../../../Services/apiEdpoints";
import ArrowUpRightIcon from "../../../../../assets/icons/ArrowUpRighIcon";
import Drawer from "../../../../../Components/drawer/Drawer";
import SearchBar from "../../../../../Components/SearchBar";
import Trash from "../../../../../assets/icons/Trash";
import image from "../../../../../assets/images/Ellipse 37.png";
import CategoryModal from "./CategoryModal";

const Category = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [allcategoryData, setAllcategoryData] = useState<any[]>([]);

  const { request: fetchAllcategorys } = useApi("put", 5003);
  const { request: deletecategoryRequest } = useApi("delete", 5003);
  const { bmcrResponse } = useContext(BmcrReponseContext)!;

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const loadcategorys = async () => {
    try {
      const url = `${endpoints.GET_ALL_BRMC}`;
      const body = { type: "category" };
      const { response, error } = await fetchAllcategorys(url, body);
      if (!error && response) {
        setAllcategoryData(response.data);
      } else {
        console.error("Failed to fetch category data.");
      }
    } catch (error) {
      toast.error("Error in fetching category data.");
      console.error("Error in fetching category data", error);
    }
  };

  const handleDelete = async (category: any) => {
    try {
      const url = `${endpoints.DELETE_BRMC}/${category.id}`;
      const { response, error } = await deletecategoryRequest(url);
      if (!error && response) {
        toast.success("category deleted successfully!");
        loadcategorys();
        if (allcategoryData.length == 1) {
          setAllcategoryData((prevData) =>
            prevData.filter((m: any) => m._id !== category._id)
          );
        }
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting category.");
    }
  };
  const filteredCategoryData = allcategoryData.filter((category) =>
    category?.categoriesName?.toLowerCase()?.includes(searchValue.toLowerCase())
  );
  useEffect(() => {
    loadcategorys();
  }, [bmcrResponse]);

  return (
    <>
      <div className="bg-white text-balck h-14 flex items-center gap-3 justify-center py-3 px-3 rounded-lg">
        <div>
          <p className="font-bold text-sm text-[#0B1320]">Category</p>
          <p className="text-xs text-[#495160] whitespace-nowrap">
            Lorem ipsum dolor sit amet cons
          </p>
        </div>
        <button
          className="bg-[#2C3E50] h-8 w-8 rounded-full flex items-center justify-center"
          onClick={toggleDrawer}
        >
          <ArrowUpRightIcon size="20" />
        </button>
      </div>

      <Drawer
        onClose={toggleDrawer}
        open={isDrawerOpen}
        position="right"
        className="bg-[#f2f1ed] p-8"
        style={{ width: "928px" }}
      >
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#ffff]">
          <p className="font-bold">Category</p>
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleDrawer}
              className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="flex my-2">
          <div className="w-[50%]">
            <SearchBar
              className="bg-[white]"
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              placeholder="Search category"
            />
          </div>
          <div className="ml-auto">
            <CategoryModal />
          </div>
        </div>
        {filteredCategoryData?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-3">
            {filteredCategoryData?.map((category: any) => (
              <div
                className="bg-white rounded-lg p-3 border border-[#EAECF0]"
                key={category._id}
              >
                <div className="grid grid-cols-12 gap-2">
                  <div className="flex items-center justify-center col-span-2">
                    <img
                      src={category.uploadImage ? category.uploadImage : image}
                      alt="category"
                      className="rounded-full w-[35px] h-[35px]"
                    />
                  </div>
                  <div className="col-span-10 flex">
                    <div className="ms-2">
                      <p className="text-[#0B1320] text-md font-semibold">
                        {category.categoriesName}
                      </p>
                      <p className="text-text_tertiary text-xs mt-1 text-balance break-words max-w-[250px]">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1 ml-auto">
                      <CategoryModal category={category} funtion={"edit"} />
                      <button
                        onClick={() => {
                          handleDelete(category);
                        }}
                      >
                        {" "}
                        <Trash size={18} color="#818894" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-red mt-5 flex w-full  items-center justify-center">
            <p className="text-[red]">No category Data !</p>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Category;
