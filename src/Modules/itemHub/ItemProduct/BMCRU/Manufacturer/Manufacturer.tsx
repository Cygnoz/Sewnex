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
import ManufacturerModal from "./ManufacturerModal";

type Props = {}

const Manufacturer = ({}: Props) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [allmanufacturerData, setAllmanufacturerData] = useState<any[]>([]);
  
    const { request: fetchAllmanufacturers } = useApi("put", 5003);
    const { request: deletemanufacturerRequest } = useApi("delete", 5003);
    const { bmcrResponse } = useContext(BmcrReponseContext)!;
  
    const toggleDrawer = () => {
      setDrawerOpen(!isDrawerOpen);
    };
  
    const loadmanufacturers = async () => {
      try {
        const url = `${endpoints.GET_ALL_BRMC}`;
        const body = { type: "manufacturer" };
        const { response, error } = await fetchAllmanufacturers(url, body);
        if (!error && response) {
          setAllmanufacturerData(response.data);
        } else {
          console.error("Failed to fetch manufacturer data.");
        }
      } catch (error) {
        toast.error("Error in fetching manufacturer data.");
        console.error("Error in fetching manufacturer data", error);
      }
    };
  
    const handleDelete = async (manufacturer: any) => {
      try {
        const url = `${endpoints.DELETE_BRMC}/${manufacturer.id}`;
        const { response, error } = await deletemanufacturerRequest(url);
        if (!error && response) {
          toast.success("manufacturer deleted successfully!");
          loadmanufacturers();
          if (allmanufacturerData.length == 1) {
            setAllmanufacturerData((prevData) =>
              prevData.filter((m: any) => m._id !== manufacturer._id)
            );
          }
        } else {
          toast.error(error.response.data.message);
        }
      } catch (error) {
        toast.error("Error occurred while deleting manufacturer.");
      }
    };
    const filteredManufacturerData = allmanufacturerData.filter((Manufacturer) =>
      Manufacturer.manufacturerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    useEffect(() => {
      loadmanufacturers();
    }, [bmcrResponse]);
  
    return (
      <>
        <div className="bg-gradient-to-r from-[#F7ECD9] to-[#B5F0D3] text-balck h-14 flex items-center gap-3 justify-center py-3 px-3 rounded-lg">
          <div>
            <p className="font-bold text-sm text-[#0B1320]">Manufacturer</p>
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
            <p className="font-bold">Manufacturer</p>
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
                placeholder="Search manufacturer"
              />
            </div>
            <div className="ml-auto">
              <ManufacturerModal />
            </div>
          </div>
          {filteredManufacturerData.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-3">
              {filteredManufacturerData.map((manufacturer: any) => (
                <div
                  className="bg-white rounded-lg p-3 border border-[#EAECF0]"
                  key={manufacturer._id}
                >
                  <div className="grid grid-cols-12  gap-2">
                    <div className="flex items-center col-span-2 justify-center rounded-full">
                      <img
                        src={manufacturer.uploadImage ? manufacturer.uploadImage : image}
                        alt="manufacturer"
                        className="rounded-full w-[35px] h-[35px]"
                      />
                    </div>
                    <div className="col-span-10 flex">
                      <div className="ms-2">
                        <p className="text-[#0B1320] text-md font-semibold">
                          {manufacturer.manufacturerName}
                        </p>
                        <p className="text-text_tertiary text-xs mt-1 text-balance break-words max-w-[250px]">
                          {manufacturer.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-1 ml-auto">
                        <ManufacturerModal manufacturer={manufacturer} funtion={"edit"} />
                        <button
                          onClick={() => {
                            handleDelete(manufacturer);
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
              <p className="text-[red]">No manufacturer Data !</p>
            </div>
          )}
        </Drawer>
      </>
    );
  };

export default Manufacturer