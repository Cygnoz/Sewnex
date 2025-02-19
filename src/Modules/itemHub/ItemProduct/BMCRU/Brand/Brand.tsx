import { useContext, useEffect, useState } from "react";
import Drawer from "../../../../../Components/drawer/Drawer";
import ArrowUpRightIcon from "../../../../../assets/icons/ArrowUpRighIcon";
import SearchBar from "../../../../../Components/SearchBar";
import Trash from "../../../../../assets/icons/Trash";
import image from "../../../../../assets/images/Ellipse 37.png";
import { endpoints } from "../../../../../Services/apiEdpoints";
import useApi from "../../../../../Hooks/useApi";
import toast from "react-hot-toast";
import BrandModal from "./BrandModal";
import { BmcrReponseContext } from "../../../../../Context/ContextShare";



const Brand = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [allBrandData, setAllBrandData] = useState<any[]>([]);

  const { request: fetchAllBrands } = useApi("put", 5003);
  const { request: deleteBrandRequest } = useApi("delete", 5003);
  const { bmcrResponse } = useContext(BmcrReponseContext)!;

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };


  const loadBrands = async () => {
    try {
      const url = `${endpoints.GET_ALL_BRMC}`;
      const body = { type: "brand" };
      const { response, error } = await fetchAllBrands(url, body);
      if (!error && response) {
        setAllBrandData(response.data);
      } else {
        console.error("Failed to fetch brand data.");
      }
    } catch (error) {
      toast.error("Error in fetching brand data.");
      console.error("Error in fetching brand data", error);
    }
  };

 

  const handleDelete = async (brand: any) => {
    try {
      const url = `${endpoints.DELETE_BRMC}/${brand.id}`;
      const { response, error } = await deleteBrandRequest(url);
      if (!error && response) {
        toast.success("Brand deleted successfully!");
        loadBrands();
        if (allBrandData.length == 1) {
          setAllBrandData((prevData) =>
            prevData.filter((m: any) => m._id !== brand._id)
          );
        }
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting brand.");
    }
  };

  const filteredBrandData = allBrandData.filter((brand) =>
    brand.brandName.toLowerCase().includes(searchValue.toLowerCase())
  );
  

  useEffect(() => {
    loadBrands();
  }, [bmcrResponse]);

  return (
    <>
      <div className="bg-white text-balck h-14 flex items-center gap-3 justify-center py-3 px-3 rounded-lg">
        <div>
          <p className="font-bold text-sm text-[#0B1320]">Brand</p>
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
          <p className="font-bold">Brand</p>
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
              placeholder="Search Brand"
            />
          </div>
          <div className="ml-auto">
           <BrandModal/>
          </div>
        </div>
        {filteredBrandData.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-3">
            {filteredBrandData.map((brand: any) => (
              <div
                className="bg-white rounded-lg p-3 border border-[#EAECF0]"
                key={brand._id}
              >
                <div className="grid grid-cols-12 gap-2">
                  <div className="flex items-center col-span-2 justify-center">
                    <img
                      src={brand.uploadImage ? brand.uploadImage : image}
                      alt="Brand"
                      className="rounded-full w-[35px] h-[35px]"
                    />
                  </div>
                  <div className="col-span-10 flex">
                    <div className="">
                      <p className="text-[#0B1320] text-md font-semibold">
                        {brand.brandName}
                      </p>
                      <p className="text-text_tertiary text-xs mt-1 text-balance break-words max-w-[250px]">
                        {brand.description}
                      </p>
                    </div>
                    <div className="flex items-start justify-center gap-1 ml-auto">
                     <BrandModal brand={brand} funtion={"edit"}/>
                      <button className="mt-1" >
                        <button
                          onClick={() => {
                            handleDelete(brand);
                          }}
                        >
                          {" "}
                          <Trash size={19} color="#818894" />
                        </button>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-red mt-5 flex w-full  items-center justify-center">
            <p className="text-[red]">No Brand Data !</p>
          </div>
        )}
      </Drawer>

    
    </>
  );
};

export default Brand;
