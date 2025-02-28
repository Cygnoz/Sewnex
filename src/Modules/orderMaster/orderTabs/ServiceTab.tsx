import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import defaultCategoryImage from "../../../assets/images/defaultCategoryImage.png";
import SearchBar from "../../../Components/SearchBar";


type Props = {}

function ServiceTab({ }: Props) {
  const [allCategory, setAllCategory] = useState<any>([]);
  const [allServices, setAllServices] = useState<any>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Fetch all parameters
  const getAllServices = async () => {
    try {
      const url = `${endpoints.GET_ALL_SERVICES}`;
      const { response, error } = await fetchAllServices(url);
      if (!error && response) {
        setAllServices(response.data);
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
    getAllServices();
  }, []);



  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredParameters =
    selectedCategory === "all"
      ? allServices.filter((param: any) => param.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      : allServices.filter(
        (param: any) => param.categoryId === selectedCategory && param.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );



  return (
    <div className="bg-white  p-6 rounded-2xl">
      <p className="text-heading font-bold text-sm">Select Service</p>
      <div className="flex justify-between items-center gap-10">
        <div className="w-[40%] mt-3">
          <SearchBar searchValue={searchQuery} onSearchChange={handleSearchChange} placeholder="Search Service" />
        </div>
        {/* Category Tabs */}
        <div className="mt-3 flex gap-2 overflow-x-scroll hide-scrollbar w-[60%]">
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
      </div>

      <div className="grid grid-cols-5 gap-5 mt-4 overflow-y-scroll hide-scrollbar max-h-56">
        {
          filteredParameters.map((service: any) => (
            <div
              key={service.id}
              className={`py-3 px-4 rounded-lg cursor-pointer
               ${selectedService?._id === service._id
                  ? "border-2 border-[#C88000] bg-[#FAF2E6]"
                  : "bg-[#F3F3F3]"
                }
               `}
              onClick={() => setSelectedService(service)}
            >
              <p className="rounded-full text-[#0B1320] font-semibold text-[11px]">
                <span className="bg-[#D3E8E8]  py-[3px] px-2 rounded-full">   {service?.categoryName} </span>
              </p>
              <img src={service?.serviceImage} className="mt-2 rounded-lg object-cover w-40 h-14" alt="" />
              <p className="text-[#495160] text-xs font-semibold mt-2">{service?.serviceName}</p>
              <p className="text-heading text-sm font-bold mt-1">₹ {service?.grandTotal}</p>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default ServiceTab