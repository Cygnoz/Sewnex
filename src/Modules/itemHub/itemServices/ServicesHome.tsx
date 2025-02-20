import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/icons/BackIcon";
import AddCategory from "./AddCategory";
import Table from "../../../Components/Table/Table";
import AddParameter from "./addParameter/AddParameter";
import AddStyle from "./addStyle/AddStyle";
import AddNewService from "./addService/AddNewService";
import { useEffect, useState } from "react";
import { endpoints } from "../../../Services/apiEdpoints";
import useApi from "../../../Hooks/useApi";
import toast from "react-hot-toast";

type Props = {};

function ServicesHome({ }: Props) {

  const [serviceData, setserviceData] = useState<any[]>([]);
  console.log(serviceData, "serviceData");

  const [loading, setLoading] = useState({
    skeleton: false,
    noDataFound: false
  });
  const [oneServiceData, setOneServiceData] = useState<any>({});

  const { request: fetchOneService } = useApi("get", 5003);
  const { request: Allservices } = useApi("get", 5003);
  const { request: deleteService } = useApi("delete", 5003);



  const fetchAllServices = async () => {
    try {
      const url = `${endpoints.GET_ALL_SERVICES}`;
      setLoading({ ...loading, skeleton: true });
      const { response, error } = await Allservices(url);
      if (error || !response) {
        setLoading({ ...loading, skeleton: false, noDataFound: true });
        return;
      }
      setserviceData(response.data);
      setLoading({ ...loading, skeleton: false });

    } catch (error) {
      console.error("Error fetching accounts:", error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };
  const getOneService = async (item: any) => {
    try {
      const url = `${endpoints.GET_ONE_SERVICE}/${item._id}`;
      const { response, error } = await fetchOneService(url);
      if (!error && response) {
        setOneServiceData(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch one item data.");
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endpoints.DELETE_SERVICE}/${id}`;
      const { response, error } = await deleteService(url);
      if (!error && response) {
        toast.success(response.data.message);
        fetchAllServices()
        console.log(response.data);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  }


  const processedData = serviceData.map((row) => ({
    ...row,
    parameterCategory: row.parameter?.map((p: any) => p.parameterName).join(", ") || "-",
  }));

  const Columns = [
    { id: "categoryName", label: "Category", visible: true },
    { id: "serviceName", label: "Name", visible: true },
    { id: "parameterCategory", label: "Parameter category", visible: true },
    { id: "unit", label: "Unit", visible: true },
    { id: "grandTotal", label: "Price", visible: true },
  ];

  useEffect(() => {
    fetchAllServices();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            <div onClick={() => navigate("/itemhub")}>
              <BackIcon />
            </div>
            <div>
              <h1 className="text-base font-bold text-heading">Services</h1>
              <p className="text-[#495160] mt-2 text-xs">
                Add and manage your styles and parameters of services
              </p>
            </div>
          </div>
        </div>
        <div>
          <AddNewService fetchService={() => fetchAllServices()} />
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center gap-4">
        <AddCategory />
        <AddParameter />
        <AddStyle />
      </div>
      <div className="mt-5">
        <Table columns={Columns}
          loading={loading.skeleton}
          data={processedData}
          searchPlaceholder={"Search Service"}
          searchableFields={["categoryName", "serviceName"]}
          onDelete={handleDelete}
          renderActions={(item) => (
            <div
              onClick={() => {
                getOneService(item);
              }}
            >
              <AddNewService
                fetchService={() => fetchAllServices()}
                page="Edit"
                oneServiceData={oneServiceData}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default ServicesHome;
