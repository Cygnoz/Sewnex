import { useContext, useEffect, useState } from "react";
import Drawer from "../../../../../Components/drawer/Drawer";
import ArrowUpRightIcon from "../../../../../assets/icons/ArrowUpRighIcon";
import SearchBar from "../../../../../Components/SearchBar";
import Trash from "../../../../../assets/icons/Trash";
import image from "../../../../../assets/images/Ellipse 37.png";
import { endpoints } from "../../../../../Services/apiEdpoints";
import useApi from "../../../../../Hooks/useApi";
import toast from "react-hot-toast";
import RackModal from "./RackModal";
import { BmcrReponseContext } from "../../../../../Context/ContextShare";



const Rack = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [allRackData, setAllRackData] = useState<any>([]);
  
    const { request: fetchAllracks } = useApi("put", 5003);
    const { request: deleterackRequest } = useApi("delete", 5003);
    const { bmcrResponse } = useContext(BmcrReponseContext)!;
  
    const toggleDrawer = () => {
      setDrawerOpen(!isDrawerOpen);
    };
  

  
  
    
    const loadracks = async () => {
      try {
        const url = `${endpoints.GET_ALL_BRMC}`;
        const body = { type: "rack" };
        const { response, error } = await fetchAllracks(url, body);
        if (!error && response) {
          setAllRackData(response.data);
        } else {
          console.error("Failed to fetch rack data.");
        }
      } catch (error) {
        toast.error("Error in fetching rack data.");
        console.error("Error in fetching rack data", error);
      }
    };
  
   
  
    const handleDelete = async (rack: any) => {
      try {
        const url = `${endpoints.DELETE_BRMC}/${rack.id}`;
        const { response, error } = await deleterackRequest(url);
        if (!error && response) {
          toast.success("rack deleted successfully!");
          loadracks();
          if (allRackData.length == 1) {
            setAllRackData((prevData:any) =>
              prevData.filter((m: any) => m._id !== rack._id)
            );
          }
        } else {
          toast.error(error.response.data.message);
        }
      } catch (error) {
        toast.error("Error occurred while deleting rack.");
      }
    };
  
  
  
    useEffect(() => {
      loadracks();
    }, [bmcrResponse]);
  
    return (
      <>
        <div className="bg-white text-balck h-14 flex items-center gap-3 justify-center py-3 px-3 rounded-lg">
          <div>
            <p className="font-bold text-sm text-[#0B1320]">Rack</p>
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
            <p className="font-bold">Rack</p>
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
                placeholder="Search rack"
              />
            </div>
            <div className="ml-auto">
             <RackModal/>
            </div>
          </div>
          {allRackData.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-3">
              {allRackData.map((rack: any) => (
                <div
                  className="bg-white rounded-lg p-3 border border-[#EAECF0]"
                  key={rack._id}
                >
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center">
                      <img
                        src={rack.uploadImage ? rack.uploadImage : image}
                        alt="rack"
                        className="rounded-full w-[35px] h-[35px]"
                      />
                    </div>
                    <div className="ms-2">
                      <p className="text-[#0B1320] text-md font-semibold">
                        {rack.rackName}
                      </p>
                      <p className="text-text_tertiary text-xs mt-1">
                        {rack.description}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-auto items-center justify-center">
                     <RackModal rack={rack} page={"edit"}/>
                      <button
                        onClick={() => {
                          handleDelete(rack);
                        }}
                      >
                        {" "}
                        <Trash size={18} color="#818894" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-red mt-5 flex w-full  items-center justify-center">
              <p className="text-[red]">No rack Data !</p>
            </div>
          )}
        </Drawer>
  
       
      </>
    );
  };

export default Rack