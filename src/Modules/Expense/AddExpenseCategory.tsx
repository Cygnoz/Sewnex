import { useState } from "react";
import Button from "../../Components/Button";
import Modal from "../../Components/modal/Modal";
import SearchBar from "../../Components/SearchBar";
import PencilLine from "../../assets/icons/PencilLine";
import Trash from "../../assets/icons/Trash";
import Plus from "../../assets/icons/Plus";

type Props = {};

type CategoryData = {
  _id?: string;
  expenseCategory: string;
  description: string;
};

function AddExpenseCategory({}: Props) {
  const [allCategory, setAllCategory] = useState<CategoryData[]>([]); // Local state for categories
  const [categories, setCategories] = useState<CategoryData>({
    expenseCategory: "",
    description: "",
  });

  const [isOpen, setIsOpen] = useState({
    main: false,
    add: false,
    edit: false,
  });

  // Handle modal open/close
  const closeModal = (main: boolean, add: boolean, edit: boolean) => {
    setIsOpen({ main: main, edit: edit, add: add });
  };

  const openModal = (main: boolean, add: boolean, edit: boolean) => {
    setIsOpen({ main: main, edit: edit, add: add });
  };

  // Handle input change for expense category form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategories((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle save functionality (adding or editing categories)
  const handleSave = () => {
    if (isOpen.edit) {
      // Logic for editing category
      console.log("Category updated:", categories);
    } else {
      // Logic for adding a new category
      setAllCategory([...allCategory, categories]);
      console.log("Category added:", categories);
    }
    setCategories({ expenseCategory: "", description: "" });
    closeModal(true, false, false); // Close the modal
  };

  // Handle delete category
  const handleDelete = (id: string) => {
    const updatedCategories = allCategory.filter((category) => category._id !== id);
    setAllCategory(updatedCategories);
    console.log("Category deleted:", id);
  };

  // Search filter logic
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredCategories = allCategory.filter((category) =>
    category.expenseCategory.toLowerCase().includes(searchValue.toLowerCase()) ||
    category.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Button variant="secondary" className="flex items-center" size="lg" onClick={() => openModal(true, false, false)}>
        <Plus color="currentColor" />
        <p className="text-md">Add Category</p>
      </Button>

      <Modal open={isOpen.main} onClose={() => closeModal(false, false, false)} className="w-[65%]">
        <div className="p-5 mt-3 bg-[#F9F7F5]">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden  bg-[#FFFFFF]">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">Category</h3>
              
            </div>
            <div className="ms-auto text-3xl cursor-pointer relative z-10" onClick={() => closeModal(false, false, false)}>
              &times;
            </div>
          </div>

          <div className="flex">
            <div className="w-96">
              <SearchBar placeholder="Search Name or Description" searchValue={searchValue} onSearchChange={setSearchValue} />
            </div>
            <div className="flex ml-auto me-2 my-4">
              <Button variant="primary" size="lg" onClick={() => openModal(true, true, false)}>
                <Plus color="white" />
                <p className="text-sm ">Add Category</p>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 ">
            {filteredCategories.length === 0 ? (
              <p className="text-center col-span-3 text-red-500 font-semibold">No categories found!</p>
            ) : (
              filteredCategories.map((category) => (
                <div key={category._id} className="flex p-2 " >
                  <div className="border border-slate-200 text-textColor rounded-xl w-96 h-auto p-3 flex justify-between bg-[#FFFFFF]">
                    <div>
                      <h3 className="text-sm font-bold">{category.expenseCategory}</h3>
                      <p className="text-xs text-textColor">{category.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="cursor-pointer" onClick={() => openModal(true, false, true)}>
                        <PencilLine color="currentColor" />
                      </p>
                      <p className="cursor-pointer" onClick={() => handleDelete(category._id || "")}>
                        <Trash color="currentColor" />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          
          </div>
          

          <Modal open={isOpen.add || isOpen.edit} onClose={() => closeModal(true, false, false)} style={{ width: "35%" }}>
            <div className="p-5">
              <div className="flex p-4 rounded-xl relative overflow-hidden h-24">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-textColor">{isOpen.edit ? "Edit" : "Add"} Category</h3>
                </div>
                <div className="ms-auto text-3xl cursor-pointer relative z-10" onClick={() => closeModal(true, false, false)}>
                  &times;
                </div>
              </div>

              <form className="grid gap-5">
                <div className="w-full">
                  <label className="block text-sm mb-1 text-labelColor">Name</label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    name="expenseCategory"
                    value={categories.expenseCategory}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 mt-1 text-sm bg-white border border-inputBorder rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm mb-1 text-labelColor">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Enter description"
                    name="description"
                    value={categories.description}
                    onChange={handleInputChange}
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm" className="text-sm pl-6 pr-6" onClick={() => closeModal(true, false, false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" className="text-sm pl-8 pr-8" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
          <div className="flex justify-end mt-5">
            <Button variant="secondary" size="lg" className="text-sm pl-6 pr-6 " onClick={() => closeModal(false, false, false)}>
                    Cancel
                  </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddExpenseCategory;
