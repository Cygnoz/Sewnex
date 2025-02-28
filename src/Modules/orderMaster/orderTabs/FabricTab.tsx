import { useEffect, useState } from "react";
import SearchBar from "../../../Components/SearchBar"
import Button from "../../../Components/Button";
import CirclePlus from "../../../assets/icons/CirclePlus";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import defaultCategoryImage from "../../../assets/images/defaultCategoryImage.png";
import defaultFabricImage from "../../../assets/images/Ellipse 38.png";


type Props = {}

function FabricTab({ }: Props) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [allCategory, setAllCategory] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");

  const { request: fetchAllServices } = useApi("get", 5003);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const url = `${endpoints.GET_ALL_CPS}/category`;
      const { response, error } = await fetchAllServices(url);
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

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-5">
        <div className="w-[70%] bg-white  p-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <p className="text-heading font-bold text-sm">Choose Fabric</p>
            <div className="w-[50%]">
              <SearchBar
                onSearchChange={setSearchValue}
                searchValue={searchValue}
                placeholder="Search Fabric"
              />
            </div>
            <Button className="text-xs font-medium" variant="secondary"><CirclePlus color="#0EBB67" /> Add New</Button>
          </div>
          {/* Category Tabs */}
          <div className="mt-4 flex gap-2 overflow-x-scroll hide-scrollbar h-9">
            <div
              className={`cursor-pointer rounded-lg py-1.5 px-3  flex gap-2 justify-between items-center border
                        ${selectedCategory === "all" ? "border-[#C88000] bg-[#FAF2E6]" : "border-[#EAECF0] bg-[#F1F1F1]"}`}
              onClick={() => setSelectedCategory("all")}
            >
              <img src={defaultCategoryImage} className="w-6 h-6 rounded-full object-cover" alt="All" />
              <p className="text-[#2C3E50] font-medium text-[11px] w-20 overflow-x-scroll hide-scrollbar">All</p>
            </div>

            {allCategory.map((category: any) => (
              <div
                key={category._id}
                className={`cursor-pointer rounded-lg py-1.5 px-3  flex gap-2 justify-between items-center border
                            ${selectedCategory === category._id ? "border-[#C88000] bg-[#FAF2E6]" : "border-[#EAECF0] bg-[#F1F1F1]"}`}
                onClick={() => setSelectedCategory(category._id)}
              >
                <img src={category?.uploadImage ? category?.uploadImage : defaultCategoryImage} className="w-6 h-6 rounded-full object-cover" alt={category.name} />
                <p className="text-[#2C3E50] font-medium text-[11px] w-20 overflow-x-scroll hide-scrollbar">{category.name}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4 overflow-y-scroll hide-scrollbar max-h-56">
            <div className="bg-[#FAF2E6] rounded-lg py-3 px-3 border-2 border-[#B47300]">
              <p className="rounded-full text-[#0B1320] font-semibold text-[11px]">
                <span className="bg-[#EAE8FF]  py-1.5 px-2.5 rounded-full">Cotton</span></p>
              <div className="flex items-center gap-4 mt-3">
                <img src={defaultFabricImage} className="rounded-full object-cover w-9 h-9" alt="" />
                <div>
                  <p className="text-[#495160] text-xs font-semibold mt-2">Plain Cotton</p>
                  <p className="text-heading text-xs font-bold mt-1">₹ 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className="w-[30%] bg-white  p-6 rounded-2xl">
          <div className="bg-[#F9F7F5] flex justify-between items-center p-4 rounded-lg">
            <div className="flex gap-4 items-center">
              <img src={defaultCategoryImage} className="rounded-lg object-cover w-20 h-12" alt="" />
              <div>
                <p className="text-heading text-xs font-semibold">Plain Cotton</p>
                <p className="rounded-full text-[#0B1320] font-semibold mt-2 text-[11px]">
                  <span className="bg-[#E8E6C7]  py-1.5 px-2.5 rounded-full">Cotton</span></p>
              </div>
            </div>
            <p className="text-heading text-sm font-bold">₹1000</p>
          </div>

          <div className="mt-6">
            <p className="flex justify-between items-center text-[#495160] font-medium text-xs">Fabric Amount
              <span className="text-heading font-bold text-sm">₹1000</span></p>
            <hr className="mt-3.5 mb-3.5" />
            <p className="flex justify-between items-center text-[#495160] font-medium text-xs">Service Amount
              <span className="text-heading font-bold text-sm">₹2000</span></p>
          </div>
          <div
            className="mt-4 rounded-lg py-1.5 px-3"
            style={{
              background: "linear-gradient(133.34deg, rgba(255, 208, 123, 0.7) -13.05%, rgba(138, 228, 184, 0.7) 138.88%)"
            }}
          >
            <p className="text-end text-[#495160] font-bold text-xs">Total </p>
            <p className="text-end mt-1 text-heading text-base font-bold">₹3500.00</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default FabricTab