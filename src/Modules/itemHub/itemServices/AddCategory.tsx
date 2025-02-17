import { ChangeEvent, useEffect, useState } from "react";
import ArrowUpRighIcon from "../../../assets/icons/ArrowUpRighIcon";
import Drawer from "../../../Components/drawer/Drawer";
import SearchBar from "../../../Components/SearchBar";
import Button from "../../../Components/Button";
import CirclePlus from "../../../assets/icons/CirclePlus";
import EPenIcon from "../../../assets/icons/EPenIcon";
import EDeleteIcon from "../../../assets/icons/EDeleteIcon";
import Modal from "../../../Components/modal/Modal";
import Input from "../../../Components/Form/Input";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import useApi from "../../../Hooks/useApi";

type Props = {};

function AddCategory({ }: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<any>({
    _id: "",
    name: "",
    description: "",
  });
  console.log(categoryData, "categoryData");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allCategory, setAllCategory] = useState<any>([])

  const { request: fetchAllCategory } = useApi("get", 5003);
  const { request: deleteCategoryRequest } = useApi("delete", 5003);
  const { request: updateCategoryRequest } = useApi("put", 5003);
  const { request: addCategoryRequest } = useApi("post", 5003);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
    setSearchTerm("")
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEdit(false);
  };

  const openModal = (category?: any) => {
    if (category) {
      setIsEdit(true);
      setCategoryData({
        _id: category._id,
        name: category.name,
        description: category.description,
      });
    } else {
      setIsEdit(false);
      setCategoryData({
        name: "",
        description: "",
      });
    }
    setModalOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };


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

  const handleSave = async () => {
    try {
      const url = isEdit
        ? `${endpoints.UPDATE_CPS}/category/${categoryData._id}`
        : `${endpoints.ADD_CPS}/category`;

      const apiCall = isEdit ? updateCategoryRequest : addCategoryRequest;

      const { response, error } = await apiCall(url, categoryData);

      if (!error && response) {
        toast.success(response.data.message);
        getAllCategory();
        closeModal();
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Error in save operation.");
    }
  };
  const handleDelete = async (category: any) => {
    try {
      const url = `${endpoints.DELETE_CPS}/category/${category._id}`;
      const { response, error } = await deleteCategoryRequest(url);

      if (!error && response) {
        toast.success(response.data.message);
        setAllCategory((prevData: any) => {
          if (!prevData || !Array.isArray(prevData)) return [];
          return prevData.filter((m: any) => m._id !== category._id);
        });
        getAllCategory();
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Error occurred while deleting brand.");
    }
  };


  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredCategories = allCategory.filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <>
      <div className="w-[30%] cursor-pointer" onClick={toggleDrawer}>
        <div className="bg-white py-4 px-6 rounded-2xl flex justify-between items-center">
          <div className="w-[65%]">
            <p className="text-[#0B1320] font-bold text-base">Add Category</p>
            <p className="text-[#495160] text-xs mt-2">
              Add and manage your categories in this section.
            </p>
          </div>
          <ArrowUpRighIcon height="44" width="44" size="20" bgColor="#2C3E50" />
        </div>
      </div>
      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right"
        style={{ width: "65%" }}
      >
        <div className="bg-white rounded-2xl p-4 flex justify-between items-center">
          <p className="text-[#0B1320] font-bold text-lg">Category</p>
          <p
            className="text-3xl cursor-pointer font-light"
            onClick={() => isDrawerOpen}
          >
            &times;
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="w-[50%]">
            <SearchBar
              placeholder="Search category"
              searchValue={searchTerm}
              onSearchChange={handleSearchChange}
            />

          </div>
          <Button onClick={() => openModal()} >
            <CirclePlus />
            <p className="text-sm"> Add Category</p>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {filteredCategories.length === 0 ? (
            <div className="flex justify-center items-center p-2 ms-[100%] w-full">
              <div className="border border-slate-200 text-textColor rounded-xl w-full h-auto p-3 flex justify-center items-center">
                <div className="text-center">
                  <p className="text-xs text-red-600 text-center">No Category Found!</p>
                </div>
              </div>
            </div>
          ) : (
            filteredCategories.map((category: any) => (
              <div key={category._id} className="flex mt-2">
                <div className="border w-80 border-[#EAECF0] bg-white text-textColor rounded-lg h-auto py-3 px-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1320]">{category.name}</h3>
                    <p className="text-xs text-[#818894] mt-1">{category.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="cursor-pointer" onClick={() => openModal(category)}>
                      <EPenIcon />
                    </p>
                    <p className="cursor-pointer" onClick={() => handleDelete(category)}>
                      <EDeleteIcon />
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      </Drawer>

      <Modal open={isModalOpen} onClose={closeModal} className="w-[46%] bg-[#F9F7F5] p-8">
        <div className=" flex justify-between items-center">
          <p className="text-[#0B1320] font-bold text-lg">Add Category</p>
          <p
            onClick={closeModal}
            className="text-3xl cursor-pointer font-light"
          >
            &times;
          </p>
        </div>
        <div className="mt-4">
          <label className=" text-[#495160] text-sm">Category name</label>
          <div className="mt-1">
            <Input
              value={categoryData.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Category name"
            />
          </div>
          <div className="mt-4">
            <label className=" text-[#495160] text-sm">Description</label>
            <div className="mt-1">
              <textarea
                rows={4}
                value={categoryData.description}
                onChange={handleInputChange}
                placeholder="Description"
                name="description"
                className="border-inputBorder w-full text-sm border rounded-2xl outline-none p-1.5 pl-2 text-zinc-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={closeModal} variant="secondary" className="text-sm font-semibold">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    </>
  );
}

export default AddCategory;
